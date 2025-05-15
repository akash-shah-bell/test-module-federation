const path = require("path");
const Webpack = require("webpack");
const { ModuleFederationPlugin } = Webpack.container
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript")

const createConfig = (parentDir, srcDir, buildDir, env) => {

  const port = 8081

  const moduleFederationRemoteConfig = {
    name: 'mfe1',
    filename: 'mfe1Entry.js',
    exposes: {
      "./Button": "./src/Button",
      ".": "./index"
    },
    // shared: {
    //   react: { singleton: true, eager: true },
    //   "react-dom": { singleton: true },
    //   "react-router-dom": { singleton: true }
    // }
  }

  const envVariables = {}
  if (env) {
    Object.keys(env).map(key => envVariables[key] = `'${env[key]}'`)
  }

  return {
    // webpack dev config
    mode: "development",
    // entry: ["@babel/polyfill", path.join(parentDir, "index.ts")],
    entry: {
      mfe1: path.join(parentDir, "index.ts"),
    },
    target: 'web',
    output: {
      path: buildDir,
      filename: "[name].js",
      chunkFilename: "[id].[name].chunk.js",
      publicPath: "/"
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      static: buildDir,
      port: port,
      historyApiFallback: true,
      hot: true,
      open: true
    },
    stats: {
      errorDetails: true
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
      alias: {
        "@": srcDir // shortcut to reference src folder from anywhere
      },
      fallback: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      }
    },

    // other config
    module: {
      rules: [{
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {      // The object assigned to "option" field can alternatively moved to ".babelrc" file
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "module:@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }, {
        test: /\.html$/,
        use: "html-loader"
      }, {
        test: /\.handlebars/,
        use: "handlebars-loader",
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }, {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "images",
          }
        }],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "fonts",
          }
        }],
      }]
    },
    plugins: [
      // Module-Federation Plugins
      new ModuleFederationPlugin(moduleFederationRemoteConfig), // module federation main config 
      new FederatedTypesPlugin({federationConfig: moduleFederationRemoteConfig}), // remote typesafe plugin

      // other plugins
      new Webpack.DefinePlugin({
        "process.env": envVariables,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        process: {
          env: {
            ...envVariables
          },
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new CleanWebpackPlugin(),
    ]
  }
}

module.exports = createConfig;
