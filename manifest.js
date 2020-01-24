module.exports = {
  version: '1.2.0',
  init: function(pluginContext) {
    let policy = require('./policies/jwt-forwarder-policy');
    pluginContext.registerPolicy(policy);
  }
};
