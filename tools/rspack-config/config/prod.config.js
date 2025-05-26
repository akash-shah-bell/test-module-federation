const path = require('node:path');
const Dotenv = require('dotenv-webpack');

const createConfig = (packageName, projectDir, devServerPort, pluginsArray) => {
  return {
    entry: path.join(projectDir, 'index.ts'),
    devServer: {
      port: devServerPort,
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
                      development: false,
                      refresh: false,
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
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs', '.json'],
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
      publicPath: 'auto',
      uniqueName: packageName,
    },
    mode: "production",
    plugins: [
      new Dotenv({
        path: path.join(projectDir, '.env')
      }),
      ...(pluginsArray || [])
    ],
  };
}

module.exports = createConfig;
