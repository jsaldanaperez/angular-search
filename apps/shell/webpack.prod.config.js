module.exports = require('./webpack.config');

module.exports.plugins[0].remotes = {
    "articles": "articles@https://kind-mud-083818c03.azurestaticapps.net/remoteEntry.js",
}