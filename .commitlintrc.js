/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-11-21 17:26:15
 * @LastEditors: wsy
 */
import fg from 'fast-glob';

function getPackages(packagePath) {
  return fg.sync('*', { cwd: packagePath, onlyDirectories: true });
}

const scopes = [
  ...getPackages('apps'),
  ...getPackages('configs'),
  ...getPackages('packages'),
  ...getPackages('scripts'),
  'project',
  'ci',
  'deploy',
  'other',
];

/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'scope-enum': [
      2,
      'always',
      scopes,
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'init',
        'chore',
        'revert',
        'types',
        'release',
        'init',
      ],
    ],
  },
  prompt: {
    alias: {
      fd: 'docs: fix typos',
    },
    scopes,
    messages: {
      scope: '选择一个提交范围:',
      customScope: '请输入自定义的提交范围 :',
      type: '选择你要提交的类型 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
      { value: 'types', name: 'types:    🎨  类型相关 | Code type related adjustments', emoji: ':art:' },
      { value: 'docs', name: 'docs:     📝  文档更新 | Documentation only changes', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
      { value: 'perf', name: 'perf:     ⚡️  性能提升 | A code change that improves performance', emoji: ':zap:' },
      { value: 'test', name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
      { value: 'build', name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies', emoji: ':package:' },
      { value: 'release', name: 'release:  🔖  版本提升 | Change the current version number', emoji: ':bookmark:' },
      { value: 'ci', name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
      { value: 'revert', name: 'revert:   ⏪️  回退代码 | Revert to a commit', emoji: ':rewind:' },
      { value: 'chore', name: 'chore:    🔨  其他修改 | Other changes that do not modify src or test files', emoji: ':hammer:' },
      { value: 'init', name: 'init:     🎉  初始化   | Initialization project', emoji: ':tada:' },
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    enableMultipleScopes: true,
    allowCustomScopes: false,
    allowEmptyScopes: false,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: true,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Number.POSITIVE_INFINITY,
    maxSubjectLength: Number.POSITIVE_INFINITY,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
