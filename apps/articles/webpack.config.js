const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = async (webpackConfig) => {
    const moduleFederationFn = await withModuleFederation(config);
    const moduleFederationConfig = moduleFederationFn(webpackConfig);
    return moduleFederationConfig;
};
