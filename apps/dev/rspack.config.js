const path = require('node:path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const {HtmlRspackPlugin} = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { createDevConfig } = require('@tools/rspack-config')
const packageJson = require('./package.json')

const name = 'dev'
const deps = packageJson.dependencies

const config = createDevConfig(
  name,
  path.resolve(__dirname),
  8080,
  [
    new ModuleFederationPlugin({
      name: 'dev',
      filename: 'remoteEntry.js',
      remotes: {
        '@remote/mfe1': 'mfe1@http://127.0.0.1:8081/mf-manifest.json',
        '@remote/mfe2': 'mfe2@http://127.0.0.1:8082/mf-manifest.json',
      },
      exposes: {
        './App': './src/App.tsx'
      },
      shared: {
        ...deps,
        'react-router-dom': {
          singleton: true,
          eager: true
        },
        'react-dom': {
          singleton: true,
          eager: true
        },
        react: {
          singleton: true,
          eager: true
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
    // isProd ? new ReactRefreshWebpackPlugin() : undefined,
    // new RsdoctorRspackPlugin()
    new ReactRefreshPlugin()
  ]
)

module.exports = { 
  ...config,
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  experiments: {
    css: true,
  },
}
