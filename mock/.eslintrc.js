module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2017,
      sourceType: 'module'
    },
    extends: 'eslint:recommended',
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    rules: {
      "no-console": "off",
      "indent": [
          "error",
          4
      ],
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ]
    }
  };
  