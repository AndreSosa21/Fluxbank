// users.js
const express = require('express');
const authenticateRequest = require('../middlewares/oauthAuthenticate'); // Middleware de autenticación OAuth2
const authorizeRole = require("../middlewares/AuthorizationRoles");
const usersRouter = express.Router();
const profileRouter = express.Router();

// Importar el router de registro para acceder al array de usuarios
const registerRouter = require('./register');
const users = registerRouter.users;

// Importar el almacén de cuentas
const accounts = require('./accountsStore');

// Ruta para que el administrador vea la lista completa de usuarios, incluyendo sus cuentas
usersRouter.get('/', authenticateRequest, authorizeRole('admin'), (req, res) => {
  const usersWithAccounts = users.map(user => {
    // Filtramos las cuentas cuyo owner (propietario) coincide con el username del usuario
    const userAccounts = accounts.filter(account => account.owner === user.username);
    return { ...user, accounts: userAccounts };
  });
  return res.status(200).json({ users: usersWithAccounts });
});

// Ruta para que cualquier usuario (admin o user) vea su propio perfil con información de sus cuentas
profileRouter.get('/', authenticateRequest, authorizeRole('admin', 'user'), (req, res) => {
  const username = req.user.username; // Obtenemos el username desde el token
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(accounts);

  // Filtramos las cuentas que pertenecen al usuario autenticado
  const userAccounts = accounts.filter(account => account.owner === username);
  return res.status(200).json({ user: { ...user, accounts: userAccounts } });
});

module.exports = { usersRouter, profileRouter };