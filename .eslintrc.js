module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // 自定义规则配置
    'linebreak-style': 'off',           // 允许任何换行符
    'no-console': 'off',                // 允许 console 语句
    'indent': ['error', 2],             // 2 空格缩进
    'quotes': ['error', 'single'],      // 使用单引号
    'semi': ['error', 'always'],        // 必须使用分号
    'no-unused-vars': ['warn'],         // 未使用变量警告
    'max-len': ['error', {              // 最大行长度
      code: 100,
      ignoreComments: true,
      ignoreUrls: true,
    }],
    'quote-props': ['error', 'as-needed'], // 属性引号按需
    'comma-dangle': ['error', 'always-multiline'], // 多行尾随逗号
    'consistent-return': 'off',         // 允许不一致的返回
    'no-underscore-dangle': 'off',      // 允许下划线前缀
    'object-curly-newline': 'off',      // 关闭对象换行限制
    'operator-linebreak': 'off',        // 关闭操作符换行限制
  },
};
