module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'prefer-destructuring': 'off',
    'react/no-find-dom-node': 'off', // I don't know
    'react/jsx-one-expression-per-line': 'off',
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'arrow-spacing': 0, // =>的前/后括号
    // 'quote-props': [2, 'always'], // 对象字面量中的属性名是否强制双引号
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
    'space-in-parens': [0, 'never'], // 小括号里面要不要有空格
    'spaced-comment': 0, // 注释风格要不要有空格什么的
    yoda: [2, 'never'], // 禁止尤达条件
    'space-unary-ops': [0, { words: true, nonwords: false }], // 一元运算符的前/后要不要加空格
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'object-shorthand': 0, // 此规则强制使用简写语法
    'import/newline-after-import': 2, //导入后换行
    // 'indent': ['error', 2], // JavaScript代码强制使用一致的缩进：2格缩进
    'no-param-reassign': 0,
    'no-nested-ternary': 0, // 是否禁止嵌套三元
    'no-underscore-dangle': 0, // 下划线
    'no-console': 0,
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ], // 如果一个变量从不重新分配，使用const声明更好。
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
