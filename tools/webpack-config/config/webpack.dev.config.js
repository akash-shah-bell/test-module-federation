const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const createConfig = (parentDir, srcDir, buildDir, env) => {
  const envVariables = {}
  if (env) {
    Object.keys(env).map(key => envVariables[key] = `'${env[key]}'`)
  }

  return {
    mode: "development",
    entry: ["@babel/polyfill", path.join(parentDir, "/src/index.tsx"), path.join(parentDir, "/src/index.ts")],
    output: {
      path: buildDir,
      filename: "[name].js",
      chunkFilename: "[id].[name].chunk.js",
      publicPath: "/"
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      static: buildDir,
      port: 8081,
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
      new Webpack.DefinePlugin({
        "process.env": envVariables,
      }),
      new HtmlWebpackPlugin({
        template: path.join(parentDir, "public/index.hbs"),
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
      new CleanWebpackPlugin()
    ]
  }
}

module.exports = createConfig;
