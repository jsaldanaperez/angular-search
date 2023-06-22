const baseConfig = require('../../module-federation.config');

module.exports = {
    ...baseConfig,
  name: 'articles',
  exposes: {
    './RemoteEntryModule': 'apps/articles/src/app/remote-entry/remote-entry.module.ts',
    './SearchModule': 'apps/articles/src/app/search/search.module.ts',
  }
};
