const tsParser = require("@typescript-eslint/parser")
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin")
const stylisticPlugin = require("@stylistic/eslint-plugin")
const eslintConfigPrettier = require("eslint-config-prettier")
const jestPlugin = require("eslint-plugin-jest")
const turboPlugin = require("eslint-plugin-turbo")

module.exports = [
  {files: ["**/*.ts", "**/*.js", "**/*.json"]},
  {
    ignores: [
      "tsconfig.*", "node_modules/*", "package.json", "*.config.js", "*.config.ts", "*rc.js", ".husky/*",
      ".yarn/*", "dist/*", "*/coverage/*", "secret*", "temp", "vendor"
    ]
  },

  // plugin:jest/recommended
  {
    ...jestPlugin.configs["flat/recommended"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
      "jest/no-export": ["off"],
      "jest/no-conditional-expect": ["off"],
      "jest/no-jasmine-globals": ["off"]
    }
  },

  // Turbo plugin
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },

  // custom configs using "@stylistic/eslint-plugin" plugin
  {
    plugins: {
      "@stylistic": stylisticPlugin
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-len": ["error", {
        code: 160,
        tabWidth: 2,
        comments: 140,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignorePattern: "^\\s*.json"
      }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/semi": ["error", "never"]
    }
  },

  // custom configs using "@typescript-eslint" plugin
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".json"]
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin
    },
    rules: {
      // ...typescriptEslintPlugin.configs["eslint-recommended"].rules,
      // ...typescriptEslintPlugin.configs["recommended"].rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }]
    }
  },

  // extending "prettier"
  eslintConfigPrettier
]
