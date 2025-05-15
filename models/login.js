// login.js (versión modificada, solo para verificar credenciales si es necesario)
// Puedes incluso remover este endpoint y dejar que el frontend se comunique directamente con /oauth/token
// funcionaaaaaaaaa
const express = require('express');
const bcrypt = require('bcryptjs');

const loginRouter = express.Router();
const registerRouter = require('./register');
const users = registerRouter.users;

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "JSON incomplete" });
    }

    // Buscar usuario en el array de usuarios
    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        // En vez de generar token aquí, se recomienda que el frontend haga la petición a /oauth/token
        return res.status(200).json({ message: "Usuario encontrado, use /oauth/token para obtener el token" });
    } else {
        return res.status(401).json({ message: "Incorrect credentials" });
    }
});

module.exports = loginRouter;
