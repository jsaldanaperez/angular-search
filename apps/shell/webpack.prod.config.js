module.exports = require('./webpack.config');

module.exports.plugins[0]._options.remotes = {
    "articles": "articles@https://kind-mud-083818c03.azurestaticapps.net/remoteEntry.js",
    "customers": "customers@https://mango-pebble-0196b3203.azurestaticapps.net/remoteEntry.js",
    "invoices": "invoices@https://green-meadow-08ac36903.azurestaticapps.net"
}