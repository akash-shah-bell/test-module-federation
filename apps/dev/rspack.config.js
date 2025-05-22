const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

const deps = require('./package.json').dependencies;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './index.tsx',

  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json', '.mjs'],
  },
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: 'auto',
    uniqueName: 'dev',
    clean: true
  },
  experiments: {
    css: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  decorators: true,
                  jsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: !isProd,
                    refresh: !isProd,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dev',
      filename: 'remoteEntry.js',
      remotes: {
        '@explat-mfe/blue-template': 'mfe1@http://localhost:8081/mfe1Entry.js',
        '@explat-mfe/green-template': 'mfe2@http://localhost:8082/mfe2Entry.js',
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
  ],
};