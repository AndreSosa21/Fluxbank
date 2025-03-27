const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');


// initialize configuration
dotenv.config();
const loginRouter = express.Router();
const user = {
    username: "admin",
    password: "1234"
}
// POST Login
loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;

    // Validar que el JSON esté completo
    if (!username || !password) {
        return res.status(400).json({ message: "JSON incomplete" });
    }

    // Validar credenciales
    if (username === user.username && password === user.password) {
        // Crear el token JWT
        const usernameAuth = { username }; // Datos para el token
        const accessToken = generateToken(usernameAuth);

        return res.status(200).json({ message: "Login successful", accessToken });
    } else {
        return res.status(401).json({ message: "incorrect credentials" });
    }
});

// Token generation
function generateToken(usernameAuth) {
    // Generate an access token
    return jwt.sign(usernameAuth, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '60s' });
}

// POST Logout
loginRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "logout unsuccessful" });
        }
        res.clearCookie('connect.sid'); // Limpiar la cookie de sesión
        return res.status(200).json({ message: "Cierre de sesión exitoso" });
    });
});

module.exports = loginRouter;

