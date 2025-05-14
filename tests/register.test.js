const request = require('supertest');
const app = require('../index'); 



describe('/register', () => {
  test('Debe crear un nuevo usuario', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'nuevoUsuario',
        password: '12345',
      });

    expect(res.statusCode).toBe(201); // o 200 si no usas 201
    expect(res.body).toHaveProperty('message');
  });

  test('Debe fallar si el usuario ya existe', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'admin',
        password: '1234',
       
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
