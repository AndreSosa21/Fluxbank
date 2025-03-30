// register.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { users } = require('./oauthModel'); // Importamos el array de usuarios de oauthModel.js

const registerRouter = express.Router();

// GET para ver todos los usuarios (opcional, solo a modo de prueba)
registerRouter.get('/', (req, res) => {
  return res.status(200).json({ users });
});

// POST Registro
registerRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Validar que el JSON esté completo
  if (!username || !password) {
    return res.status(400).json({ message: "JSON incomplete" });
  }

  // Verificar si el usuario ya existe
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = {
      id: Date.now(),                 // O un ID autoincremental en tu BD real
      username,
      password: hashedPassword,
      role: username === "admin" ? "admin" : "user"
    };
    users.push(newUser);

    // A diferencia de la versión anterior, aquí NO generamos un token.
    // El flujo OAuth2 exige obtener el token mediante /oauth/token
    return res.status(201).json({
      message: "User registered successfully. Now you can request a token via /oauth/token."
    });
  } catch (error) {
    return res.status(500).json({ message: "Error hashing password" });
  }
});

registerRouter.users = users;
module.exports = registerRouter;