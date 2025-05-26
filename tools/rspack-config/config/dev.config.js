const path = require('node:path');
const Dotenv = require('dotenv-webpack');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin')

const createConfig = (packageName, projectDir, devServerPort, pluginsArray) => {
  return {
    entry: path.join(projectDir, 'src', 'index.ts'),
    source: {
      tsconfigPath: path.join(projectDir, 'tsconfig.json'),
    },
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
                    tsx: true
                  },
                  transform: {
                    react: {
                      runtime: 'automatic',
                      development: true,
                      refresh: true,
                    },
                  },
                },
              },
              type: 'javascript/auto'
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'builtin:swc-loader',
              options: {
                jsc: {
                  parser: {
                    syntax: 'ecmascript',
                    jsx: true,
                  },
                  transform: {
                    react: {
                      pragma: 'React.createElement',
                      pragmaFrag: 'React.Fragment',
                      throwIfNamespace: true,
                      development: false,
                      useBuiltins: false
                    },
                  },
                },
              },
              type: 'javascript/auto'
            }
          ],
        },
        {
          test: /\.md$/,
          type: 'asset/resource',
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs', '.json']
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
      publicPath: `http://localhost:${devServerPort}/`,
      uniqueName: packageName,
    },
    mode: "development",
    plugins: [
      new TsCheckerRspackPlugin(),
      new Dotenv({
        path: path.join(projectDir, '.env')
      }),
      ...(pluginsArray || [])
    ],
  };
}

module.exports = createConfig;
