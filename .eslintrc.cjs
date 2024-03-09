module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: { parser: '@typescript-eslint/parser' },
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended', 'plugin:tailwindcss/recommended'],
    plugins: ['@stylistic'],
    rules: {
      'no-console': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'never'
      }],
      'vue/multi-word-component-names': 0,
      'vue/no-multiple-template-root': 0,
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/max-len': ['error', {
        code: 155,
        tabWidth: 4,
        comments: 65,
        ignorePattern: 'class="[^"]*"|d="[^"]*"'
      }],
      'object-curly-newline': ['error', {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 }
      }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/func-call-spacing': ['error', 'never']
    }
  }