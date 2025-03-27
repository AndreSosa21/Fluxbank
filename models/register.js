const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');

// Inicializar configuración
dotenv.config();
const registerRouter = express.Router();

// Simulación de base de datos en memoria
let users = [
    {username: "andre",
    password: "1234"}
]; // Aquí se almacenarán los usuarios registrados

registerRouter.get('/', (req, res) => {
    return res.status(200).json({users: users});
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

    // Hash de la contraseña
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Generar un hash de la contraseña

        // Crear el nuevo usuario y agregarlo a la base de datos
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        // Crear el token JWT
        const accessToken = generateToken({ username });

        return res.status(201).json({ message: "User registered successfully", accessToken });
    } catch (error) {
        return res.status(500).json({ message: "Error hashing password" });
    }
});

// Token generation
function generateToken(userData) {
    return jwt.sign(userData, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '60s' });
}

registerRouter.users = users;
module.exports = registerRouter;
