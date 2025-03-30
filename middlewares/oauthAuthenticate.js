// middlewares/oauthAuthenticate.js
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

function authenticateRequest(req, res, next) {
  const oauth = req.app.oauth; // Asumiendo que en index.js se asigna a app.oauth
  const request = new Request(req);
  const response = new Response(res);

  oauth.authenticate(request, response)
    .then(token => {
      req.user = token.user; // El token contiene el usuario autenticado
      next();
    })
    .catch(err => {
      res.status(err.code || 500).json(err);
    });
}

module.exports = authenticateRequest;