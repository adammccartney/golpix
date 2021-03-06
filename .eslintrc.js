module.exports = {
    env: {
        browser: true,
        es2020: true,
    },

    extends: [
        'plugin:vue/essential',
    ],

    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },

    plugins: [
        'vue',
    ],

    rules: {},

    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
};
