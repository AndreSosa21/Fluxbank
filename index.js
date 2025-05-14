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
      "https://fluxbank-delta.vercel.app/"
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Configuración del servidor OAuth2
const oauthModel = require('./models/oauthModel');
app.oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 3600, // Token con duración de 60 segundos
    allowBearerTokensInQueryString: true
});

// Endpoint para obtener el token (grant_type = "password")
app.post('/oauth/token', (req, res) => {
    const request = new Request(req);
    const response = new Response(res);
    app.oauth.token(request, response)
        .then(token => res.json(token))
        .catch(err => res.status(err.code || 500).json(err));
});

// Middleware de autenticación que valida el token de acceso
function authenticateRequest(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    app.oauth.authenticate(request, response)
        .then(token => {
            req.user = token.user;
            console.log("Usuario autenticado:", req.user);
            next();
        })
        .catch(err => res.status(err.code || 500).json(err));
}

// Endpoint protegido: Perfil del usuario (ejemplo)
const accounts = require("./models/accountsStore");
app.get("/profile", authenticateRequest, (req, res) => {
    const username = req.user.username;
    const userAccounts = accounts.filter(account => account.owner === username);
    res.json({ user: req.user, accounts: userAccounts });
});

// Rutas de transacciones (protegidas)
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/transactions", authenticateRequest, transactionRoutes);

// Rutas de creación de cuentas (protegidas)
const accountsRoutes = require("./models/accountsRoutes");
app.use("/accounts", authenticateRequest, accountsRoutes);

// Rutas de registro (públicas)
const registerRouter = require("./models/register");
app.use("/register", registerRouter);

//login
const loginRouter = require("./models/login");
app.use("/login", loginRouter);

// Rutas de usuarios y perfil (ya implementadas previamente)
const { usersRouter, profileRouter } = require("./models/users");
app.use("/users", authenticateRequest, usersRouter);
app.use("/userProfile", authenticateRequest, profileRouter);

// Endpoint raíz para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.json({ message: "🚀 Backend desplegado correctamente en Vercel!" });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
// Exportar la aplicación para pruebas
module.exports = app;