const createDevConfig = require('./webpack.dev.config');
const createProdConfig = require('./webpack.prod.config');
const createHostConfig = require('./webpack.mf-host.config');
const createRemoteConfig = require('./webpack.mf-remote.config');

module.exports = {createDevConfig, createProdConfig, createHostConfig, createRemoteConfig}
