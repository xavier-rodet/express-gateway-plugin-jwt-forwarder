# express-gateway-plugin-jwt-forwarder

This plugin for [Express Gateway](https://express-gateway.io) makes it possible to forward JWT payload through headers.

Why ? If your want to access specific JWT payload fields easily (i.e. sub to access your current user identifiant) trough http headers in your APIs without having to deal with JWT at all!

IMPORTANT: This plugin DOES NOT validate JWT, it is just forwarding its payload.
This means that you must validate it first using [built-in jwt policy](https://www.express-gateway.io/docs/policies/jwt/) or [jwks plugin](https://github.com/DrMegavolt/express-gateway-plugin-jwks) or whatever.

## Installation

Simply type from your shell environment:

```bash
eg plugin install express-gateway-plugin-jwt-forwarder
```

## Quick start

1. Make sure the plugin is listed in [system.config.yml file](https://www.express-gateway.io/docs/configuration/system.config.yml/).
   This is done automatically for you if you used the command above.

2. Add the configuration keys to [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

## Default use case

```yaml
policies:
  - jwks: # You should validate your jwt before forwarding its fields (use whatever policy you want for validation of course :-))
  - jwt-forwarder:
```

Note: this will forward the header "x-jwt-sub" with the value of the jwt "sub" field

### Custom use case

```yaml
policies:
  - jwks: # You should validate your jwt before forwarding its fields (use whatever policy you want for validation of course :-))
  - jwt-forwarder:
      - action:
          prefix: 'custom-prefix-'
          fields: ['sub', 'iss', 'custom-field']
```

## Want to make your own plugin?

Just check out our [plugin development guide](https://www.express-gateway.io/docs/plugins/).
We can't wait to see your custom stuff in the Gateway!
