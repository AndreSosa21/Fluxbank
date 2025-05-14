// tests/users.test.js
const request = require('supertest');
const express = require('express');

// Función para importar el array de usuarios desde register.js
const importUsers = () => require('../models/register').users;

// Mock del middleware de autenticación OAuth2
jest.mock('../middlewares/oauthAuthenticate', () => (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    req.user = { username: token, role: token === 'admin' ? 'admin' : 'user' };
  }
  next();
});

// Mock del middleware de autorización de roles
jest.mock('../middlewares/AuthorizationRoles', () => (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
});

// Obtenemos el array de usuarios real (según register.js)
const users = importUsers();

// Mock del almacén de cuentas
jest.mock('../models/accountsStore', () => ([
  { owner: 'admin', id: 1, balance: 100 },
  { owner: 'jane', id: 2, balance: 50 }
]));

// Importar el router después de los mocks
const { usersRouter } = require('../models/users');

// Configurar servidor Express de prueba
const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('GET /users', () => {
  it('debería permitir a admin ver lista de usuarios con cuentas', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer admin');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users).toHaveLength(users.length);

    const adminEntry = res.body.users.find(u => u.username === 'admin');
    expect(adminEntry).toBeDefined();
    expect(adminEntry.accounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ owner: 'admin', id: 1, balance: 100 })
      ])
    );
  });

  it('debería prohibir a usuarios no-admin ver la lista', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer jane');

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message', 'Forbidden');
  });
});