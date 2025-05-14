const request = require('supertest');
const app = require('../index'); 




describe('/login', () => {
  test('Debe iniciar sesión con credenciales válidas', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'Andre',
        password: '1234'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  test('Debe fallar con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'fakeuser',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
