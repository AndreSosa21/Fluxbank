// users.js
const express = require('express');
const authenticateRequest = require('../middlewares/oauthAuthenticate'); // Middleware OAuth2
const authorizeRole = require('../middlewares/AuthorizationRoles');
const usersRouter = express.Router();
const profileRouter = express.Router();

// Importar el router de registro para acceder al array de usuarios
const registerRouter = require('./register');
const users = registerRouter.users;

// Ruta GET para que el admin vea la lista completa de usuarios
usersRouter.get('/', authenticateRequest, authorizeRole('admin'), (req, res) => {
  return res.status(200).json({ users });
});

// Ruta GET para que cualquier usuario (admin o user) vea su propio perfil
profileRouter.get('/', authenticateRequest, authorizeRole('admin', 'user'), (req, res) => {
  const username = req.user.username; // Obtenemos el username desde el token OAuth2
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});

module.exports = { usersRouter, profileRouter };