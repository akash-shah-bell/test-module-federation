const webpackConfig = require("@tools/webpack-config")
const path = require("path")
const dotenv = require("dotenv")

dotenv.config()

const parentDir = path.join(__dirname, "../")
const srcDir = path.join(parentDir, "src")
const buildDir = path.join(parentDir, "dist")

module.exports = webpackConfig.createHostConfig(parentDir, srcDir,buildDir, process.env)