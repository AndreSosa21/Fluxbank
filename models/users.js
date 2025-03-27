const express = require('express');
const  authenticate  = require("../middlewares/Authentication");
const authorizeRole = require("../middlewares/AuthorizationRoles");
const usersRouter = express.Router();
const profileRouter = express.Router();
// Importar el router de registro y acceder al array de usuarios
const registerRouter = require('./register');
const users = registerRouter.users;

// Ruta para que el admin vea todos los usuarios
usersRouter.get('/', authenticate, authorizeRole('admin'), (req, res) => {
    return res.status(200).json({ users: users });
});

// Ruta para ver el perfil del usuario
profileRouter.get('/', authenticate, authorizeRole('admin', 'user'), (req, res) => {
    const username = req.user.username; // Obtener username desde el token

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    

    return res.status(200).json({ user: user });

});

module.exports = {usersRouter, profileRouter};


