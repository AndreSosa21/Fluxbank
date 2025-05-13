const request = require('supertest');
const app = require('../index'); // asegúrate que la ruta sea correcta

describe('Servidor Backend', () => {
  test('GET / debe responder con mensaje de éxito', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: '🚀 Backend desplegado correctamente en Vercel!' });
  });
});

