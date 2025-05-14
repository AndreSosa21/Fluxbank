const request = require('supertest');
const app = require('../index');

describe('POST /accounts', () => {
  let token;
  let nuevaCuenta;


  beforeAll(async () => {
    
    // Obtener token válido
    const res = await request(app)
      .post('/oauth/token')
      .type('form')
      .send({
        grant_type: 'password',
        username: 'Andre',
        password: '1234',
        client_id: 'application',
        client_secret: 'secret',
      });

    token = res.body.accessToken; // Asegúrate de usar la propiedad correcta
  });

  test('Debe crear una cuenta con datos válidos', async () => {
    const res = await request(app)
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountType: 'ahorros',
        initialBalance: 1000
      });

    expect(res.statusCode).toBe(201); // o 200 si usas esa convención
    expect(res.body).toHaveProperty('account');
    expect(res.body.account).toMatchObject({
      accountType: 'ahorros',
        
      });
    });
     test('Debe fallar si falta un campo', async () => {
    const res = await request(app)
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountType: 'corriente'
        // falta balance
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('Debe fallar si no hay token', async () => {
    const res = await request(app)
      .post('/accounts')
      .send({
        accountType: 'corriente',
        initialBalance: 1000
      });

    expect(res.statusCode).toBe(401); // o 403 si así lo manejas
  });
});

