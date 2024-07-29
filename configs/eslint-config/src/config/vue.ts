import type { TypedFlatConfigItem } from '@antfu/eslint-config';
// import wsyc from 'eslint-plugin-wsyc';

export async function vue(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [
        '**/*.vue',
      ],
      rules: {
        // 'wsyc/max-attributes-pre-line': ['error'],
        'vue/block-order': ['error', {
          order: [
            'route',
            'i18n',
            'script',
            'template',
            'style',
          ],
        }],
        'vue/component-api-style': ['error',
          ['script-setup', 'composition'],
        ],
        'vue/match-component-import-name': ['error'],
        'vue/new-line-between-multi-line-property': ['error'],
        'vue/no-empty-component-block': ['error'],
        'vue/no-potential-component-option-typo': ['error', {
          presets: ['all'],
        }],
        'vue/prefer-define-options': ['error'],
        'vue/valid-define-options': ['error'],
        'vue/require-macro-variable-name': ['error', {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs',
        }],
        'vue/no-unused-emit-declarations': ['error'],
        'vue/attribute-hyphenation': [
          'warn',
          'always',
          {},
        ],
      },
    },
    {
      files: [
        '**/views/**/*.vue',
      ],
      rules: {
        'vue/no-multiple-template-root': ['error'],
      },
    },
  ];
}
