const request = require('supertest');
const app = require('../index'); 


describe('/profile', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/oauth/token')
    .type('form')
    .send({
      grant_type: 'password',
      username: 'admin',
      password: '1234',
      client_id: 'application',
    client_secret: 'secret',
    });
    token = res.body.accessToken;
  });

  test('Debe devolver el perfil con token válido', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
  });

  test('Debe fallar sin token', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toBe(401); // o 500 si tu modelo lanza error
  });
});
