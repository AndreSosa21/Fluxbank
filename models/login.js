const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');

// initialize configuration
dotenv.config();
const loginRouter = express.Router();

// Importar el router de registro y acceder al array de usuarios
const registerRouter = require('./register');
const users = registerRouter.users;

const adminUser = {
    username: "admin",
    password: "1234"
};

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;

    console.log(users);

    // Validar que el JSON esté completo
    if (!username || !password) {
        return res.status(400).json({ message: "JSON incomplete" });
    }

    // Verificar si el usuario es el admin
    if (username === adminUser.username && password === adminUser.password) {
        const accessToken = generateToken({ username });
        return res.status(200).json({ message: "Login successful", accessToken });
    }

    // Verificar si el usuario está en la base de datos de usuarios registrados
    const user = users.find(user => user.username === username); // Buscar usuario registrado
    if (user && bcrypt.compareSync(password, user.password)) {
        const accessToken = generateToken({ username });
        return res.status(200).json({ message: "Login successful", accessToken });
    } else {
        return res.status(401).json({ message: "Incorrect credentials" });
    }
});

// Token generation
function generateToken(usernameAuth) {
    return jwt.sign(usernameAuth, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '60s' });
}

module.exports = loginRouter;