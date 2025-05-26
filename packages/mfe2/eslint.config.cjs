const Config = require('@tools/eslint-config')
const ignoreFiles = Config.NodeESLintConfig.find(e => !!e.ignores)?.ignores || []

module.exports = [
  ...Config.NodeESLintConfig,
  {ignores: [...ignoreFiles, "*.cjs", "*.d.ts"]}
]