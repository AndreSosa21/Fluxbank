const request = require('supertest');
const app = require('../index'); 

describe('/oauth/token', () => {
  test('Debe devolver un token con credenciales válidas', async () => {
    const res = await request(app)
      .post('/oauth/token')
      .type('form')
      .send({
        grant_type: 'password',
        username: 'admin',
        password: '1234',
        client_id: 'application',
        client_secret: 'secret',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  test('Debe fallar con credenciales inválidas', async () => {
    const res = await request(app)
      .post('/oauth/token')
      .type('form')
      .send({
        grant_type: 'password',
        username: 'hola',
        password: '12345',
        client_id:     'application',
        client_secret: 'secret',
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
