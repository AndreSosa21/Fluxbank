// index.js
const express = require("express");
const cors = require("cors");
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const app = express();

// Configuración de middlewares
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(cors({
    origin: [
      "http://localhost:5173", 
      "https://state-pattern-andresosa21-andresosa21s-projects.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Configuración del servidor OAuth2
const oauthModel = require('./models/oauthModel');
app.oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 60, // Token con duración de 60 segundos
    allowBearerTokensInQueryString: true
});

// Endpoint para obtener el token (grant_type = "password")
app.post('/oauth/token', (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    app.oauth.token(request, response)
        .then(function(token) {
            res.json(token);
        })
        .catch(function(err) {
            res.status(err.code || 500).json(err);
        });
});

// Middleware de autenticación que valida el token de acceso
function authenticateRequest(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    app.oauth.authenticate(request, response)
        .then(function(token) {
            req.user = token.user; // Se guarda la información del usuario extraída del token
            next();
        })
        .catch(function(err) {
            res.status(err.code || 500).json(err);
        });
}

// Endpoint protegido: Perfil del usuario (ejemplo)
app.get("/profile", authenticateRequest, (req, res) => {
    res.json({ user: req.user });
});

// Rutas de transacciones (protegidas)
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/transactions", authenticateRequest, transactionRoutes);

// Rutas de registro (públicas)
const registerRouter = require("./models/register");
app.use("/register", registerRouter);

// Rutas de usuarios y perfil: 
// - La ruta "/users" muestra la lista completa de usuarios y solo puede accederse con el token del admin.
// - La ruta "/userProfile" permite a cualquier usuario (admin o user) ver su propio perfil.
const { usersRouter, profileRouter } = require("./models/users");
app.use("/users", authenticateRequest, usersRouter);
app.use("/userProfile", authenticateRequest, profileRouter);

// Endpoint raíz para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.json({ message: "🚀 Backend desplegado correctamente en Vercel!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});