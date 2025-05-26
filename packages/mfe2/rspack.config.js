const path = require('node:path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { createDevConfig } = require('@tools/rspack-config')

const name = 'mfe2'

const config = createDevConfig(
  name,
  path.resolve(__dirname),
  8082,
  [
    new ModuleFederationPlugin({
      name,
      filename: 'remoteEntry.js',
      exposes: {
        "./index": "./src/index.ts"
      },
      shared: []
    })
  ]
)

module.exports = config