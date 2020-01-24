module.exports = {
  version: '0.0.10',
  policies: ['jwt-forwarder'],
  init: function(pluginContext) {
    let policy = require('./policies/jwt-forwarder-policy');
    pluginContext.registerPolicy(policy);
  }
};
