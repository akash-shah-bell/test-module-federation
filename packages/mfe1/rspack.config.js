const path = require('node:path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { createDevConfig } = require('@tools/rspack-config')

const name = 'mfe1'

const config = createDevConfig(
  name,
  path.resolve(__dirname),
  8081,
  [
    new ModuleFederationPlugin({
      name,
      filename: 'remoteEntry.js',
      exposes: {
        "./index": "./src/index.ts"
      },
      remotes: {
        '@remote/mfe2': 'mfe2@http://127.0.0.1:8082/mf-manifest.json',
      },
      shared: []
    })
  ]
)

module.exports = config