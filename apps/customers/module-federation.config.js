const baseConfig = require('../../module-federation.config');

module.exports = {
    ...baseConfig,
  name: 'customers',
  exposes: {
    './RemoteEntryModule': 'apps/customers/src/app/remote-entry/entry.module.ts',
    './SearchModule': 'apps/customers/src/app/search/search.module.ts',
  }
};
