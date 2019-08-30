const path = require('path')
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['util', './src/assets/js/util.js']]
      }
    }
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  }
}
