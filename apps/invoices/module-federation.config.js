const baseConfig = require('../../module-federation.config');

module.exports = {
    ...baseConfig,
  name: 'invoices',
  exposes: {
    './RemoteEntryModule': 'apps/invoices/src/app/remote-entry/entry.module.ts',
    './SearchModule': 'apps/invoices/src/app/search/search.module.ts',
  }
};
