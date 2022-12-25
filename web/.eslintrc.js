module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    "project": ["tsconfig.json"] ,
  },
  plugins: [
    'react'
  ],
  "rules": {
    "jsx-quotes": ["error", "prefer-double"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": [2, 2, {checkAttributes: true}],
    "semi": ["error", "always"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off"
  }
}
