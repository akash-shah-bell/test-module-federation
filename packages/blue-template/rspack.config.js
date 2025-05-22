const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')

const mode = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './index.ts',
  devServer: {
    port: 8081,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
    uniqueName: 'mfe1',
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1',
      filename: 'mfe1Entry.js',
      exposes: {
        "./index": "./index.ts"
      },
      remotes: {
        '@explat-mfe/green-template': 'mfe2@http://localhost:8082/mfe2Entry.js',
      },
      shared: []
    })
  ],
};