import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export async function stylistic(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'curly': ['error', 'all'],
        'antfu/consistent-list-newline': 'off',
        'regexp/no-unused-capturing-group': 'off',
      },
    },
    {
      rules: {
        'style/semi': ['error', 'always'],
      },
    },
    {
      files: [
        '**/plop-templates/**/*.js',
      ],
      rules: {
        'style/arrow-parens': ['off'],
      },
    },
  ];
}
