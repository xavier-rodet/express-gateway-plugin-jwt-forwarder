var atob = require('atob');

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jwtPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jwtPayload);
}

// Insipred by : https://github.com/crohit92/express-gateway-plugin-jwt-extractor/blob/master/policies/jwt-extractor-policy.js
module.exports = {
  name: 'jwt-forwarder',
  policy: parameters => {
    return (req, res, next) => {
      const jwt = req.get('Authorization').replace('Bearer ', '');
      const payload = parseJwt(jwt);

      parameters.fields.forEach(field => {
        if (field in payload) {
          req.headers[parameters.prefix + field] = payload[field];
        }
      });

      next();
    };
  },
  schema: {
    $id: 'http://express-gateway.io/schemas/policies/jwt-forwarder.json',
    type: 'object',
    properties: {
      fields: {
        title: 'Fields',
        description: 'List of JWT Payload fields to forward',
        type: 'array',
        default: ['sub']
      },
      prefix: {
        title: 'Prefix',
        description: 'Prefix used for header names',
        type: 'string',
        default: 'x-jwt-'
      }
    },
    required: ['fields', 'prefix']
  }
};
