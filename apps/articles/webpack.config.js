const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath =
  process.env.NX_TSCONFIG_PATH ??
  path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [
    "@angular-search/shared/search"
  ],
  workspaceRootPath
);

module.exports = {
  output: {
    uniqueName: 'articles',
    publicPath: 'auto',
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'articles',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteEntryModule': 'apps/articles/src/app/remote-entry/remote-entry.module.ts',
        './SearchModule': 'apps/articles/src/app/search/search.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^13.0.0' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^13.0.0' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: '^13.0.0' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^13.0.0' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '^13.0.0' },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
