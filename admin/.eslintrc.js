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
        map: [
          ['util', './src/assets/js/util.js']
        ]
      }
    }
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-redeclare': 'off'
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  // linterOptions: {
  //   "exclude": [
  //     "src/proto/*"
  //   ]
  // },
  globals: {
    util: true,
    echarts: true,
    COS: true,
    proto: true,
    COMPILED: true,
    f: true,
    d3: true,
    scale: true
  }
}
