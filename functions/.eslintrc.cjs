module.exports = {
  env: {
    node: true,  // Enables Node.js global variables like `require`
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'script', // CommonJS compatibility
  },
  rules: {
    'no-unused-vars': 'warn', // Adjust as needed
    'no-undef': 'off',        // Prevent errors for CommonJS syntax like `require`
  },
};

