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
  policy: actionParams => {
    return (req, res, next) => {
      const payload = parseJwt(jwt);

      for (let payloadField in actionParams.fields) {
        req.headers[actionParams.prefix + payloadField] = payload[payloadField];
      }
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
        default: ['sub'],
        required: true
      },
      prefix: {
        title: 'Prefix',
        description: 'Prefix used for header names',
        type: 'string',
        default: 'x-jwt-',
        required: true
      }
    }
  }
};
