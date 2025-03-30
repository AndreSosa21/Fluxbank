// oauthModel.js
const bcrypt = require('bcryptjs');

// Simulación de datos en memoria
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("1234", 10), role: "admin" },
  { id: 2, username: "Andre", password: bcrypt.hashSync("1234", 10), role: "user" }
];

const clients = [
  {
    id: 'application',
    clientId: 'application',
    clientSecret: 'secret',
    grants: ['password']
  }
];

const tokens = [];

module.exports = {
  users, // <-- Exportamos para poder usarlo en register.js

  getAccessToken(accessToken) {
    const token = tokens.find(t => t.accessToken === accessToken);
    if (!token) return null;
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: token.client,
      user: token.user
    };
  },

  getClient(clientId, clientSecret) {
    return clients.find(
      c => c.clientId === clientId && c.clientSecret === clientSecret
    ) || null;
  },

  saveToken(token, client, user) {
    const tokenData = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: client,
      user: user
    };
    tokens.push(tokenData);
    return tokenData;
  },

  getUser(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) return null;
    if (!bcrypt.compareSync(password, user.password)) return null;
    return user;
  },

  revokeToken(token) {
    const index = tokens.findIndex(t => t.accessToken === token.accessToken);
    if (index !== -1) {
      tokens.splice(index, 1);
      return true;
    }
    return false;
  }
};