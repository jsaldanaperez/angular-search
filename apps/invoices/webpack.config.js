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
const webpackMappingsPath = path.join(__dirname, '../../webpack.mappings.js');
const webpackMappings = require(webpackMappingsPath);
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(tsConfigPath, webpackMappings.libs, workspaceRootPath);

module.exports = {
  output: {
    uniqueName: 'invoices',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      library: {
        type: 'module',
      },
      name: 'invoices',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': 'apps/invoices/src/app/remote-entry/entry.module.ts',
        './SearchModule': 'apps/invoices/src/app/search/search.module.ts',
      },
      shared: mf.share({
        ...webpackMappings.framework,
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
