const { peerDependencies } = require('./package.json');

module.exports = {
  extends: '@guggugit',
  plugins: ['react'],
  env: {
    jest: true,
  },
  globals: {
    fetch: true,
  },
  rules: {
    'import/no-unresolved': ['error', { ignore: Object.keys(peerDependencies) }],
  },
};
