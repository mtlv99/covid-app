module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // "import/extensions": "always",
    'linebreak-style': ['error', 'windows'],
    semi: 'warn',
    'no-unused-vars': 'off',
    // React import is no longer required since React 17
    'react/react-in-jsx-scope': 'off',
    // Disable prop types
    'react/prop-types': 'off',
    // This rule doesn't help with the creation of index files for components.
    'import/prefer-default-export': 'off',
    // I prefer to use this type of definition, just a personal preference, but it's good to
    // have an standard on it.
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
};
