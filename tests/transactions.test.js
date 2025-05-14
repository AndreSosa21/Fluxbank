const request = require('supertest');
const app = require('../index');

describe('/transactions', () => {
  let token;
  let sourceAccount;
  let destinationAccount;

  beforeAll(async () => {
    // Obtener token
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

    token = res.body.accessToken;

    // Crear cuenta de origen
    const srcRes = await request(app)
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountType: 'ahorros',
        initialBalance: 1000
      });

    sourceAccount = srcRes.body.account.accountNumber;

    // Crear cuenta de destino
    const destRes = await request(app)
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountType: 'corriente',
        initialBalance: 500
      });

    destinationAccount = destRes.body.account.accountNumber;
  });

  test('Debe crear una transacción válida', async () => {
    const res = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sourceAccount,
        destinationAccount,
        amount: 333
      });

    console.log('Respuesta transacción válida:', res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('transactionId');
  });

  test('Debe fallar si falta un campo obligatorio', async () => {
    const res = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100
        // falta sourceAccount y destinationAccount
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('Debe fallar si no hay token', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({
        sourceAccount,
        destinationAccount,
        amount: 100
      });

    expect(res.statusCode).toBe(401); // según tu middleware
  });
});
