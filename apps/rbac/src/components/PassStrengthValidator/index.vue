<script setup lang="ts">
import { isFunction } from 'lodash-es';
import zxcvbn from 'zxcvbn';
import RuleItem from './rule.vue';

defineOptions({
  name: 'PassStrengthValidator',
});

defineProps({
  vertical: Boolean,
});

const value = defineModel<string>({
  default: '',
});
const isValidate = defineModel('validate');

const Zxc = computed(() => {
  return zxcvbn(value.value);
});

function validate(target: string) {
  return () => {
    if (value.value === '') {
      return false;
    }
    if (Array.isArray(Zxc.value.sequence)) {
      return Zxc.value.sequence.every((item) => {
        return item?.pattern !== target;
      });
    }
    return false;
  };
}

const rules = [
  {
    rule: /^.{8,16}$/,
    message: '密码长度必须在8到16个字符之间。',
    flag: false,
    source: 'basic',
  },
  {
    rule: /[a-z]/,
    message: '密码必须至少包含一个小写英文字母。',
    flag: false,
    source: 'basic',
  },
  {
    rule: /[A-Z]/,
    message: '密码必须至少包含一个大写英文字母。',
    flag: false,
    source: 'basic',
  },
  {
    rule: /\d/,
    message: '密码必须至少包含一个数字。',
    flag: false,
    source: 'basic',
  },
  {
    rule: /[~!@#$%^&*()_+=\-.,]/,
    message: '密码必须至少包含一个特殊字符（例如：~!@#$%^&*()_+=\\-.,）。',
    flag: false,
    source: 'basic',
  },
  {
    rule: validate('dictionary'),
    message: '密码不应包含常用字典中的单词或短语。',
    flag: false,
  },
  {
    rule: validate('spatial'),
    message: '密码不应基于键盘布局的简单模式（例如：连续的字母或键盘行）。',
    flag: false,
  },
  {
    rule: validate('repeat'),
    message: '密码不应包含重复使用的字符或序列。',
    flag: false,
  },
  {
    rule: validate('sequence'),
    message: '密码不应包含顺序排列的数字或字母序列。',
    flag: false,
  },
  {
    rule: validate('date'),
    message: '密码不应使用常见的日期格式或数字序列。',
    flag: false,
  },
];

watchEffect(() => {
  rules.forEach(({ rule }, index) => {
    if (isFunction(rule)) {
      const flag = rule();
      rules[index].flag = flag;
    }
    else {
      const flag = rule.test(value.value);
      rules[index].flag = flag;
    }
  });
  isValidate.value = rules.every(({ flag }) => flag);
});
</script>

<template>
  <div
    class="pass-strength-validator"
    :class="{ vertical }"
  >
    <div class="title-wrap">
      密码强度校验提示
    </div>
    <div class="rules-wrap">
      <div class="basic-rules">
        <div class="rules-title">
          标准规则集
        </div>
        <div>
          <template v-for="(rule, index) in rules" :key="index">
            <RuleItem
              v-if="rule.source === 'basic'"
              :rule="rule.rule"
              :message="rule.message"
              :flag="rule.flag"
              :vertical="vertical"
            />
          </template>
        </div>
        <a-divider v-if="!vertical" />
      </div>
      <div class="advanced-rules">
        <div class="rules-title">
          高级规则集
        </div>
        <div>
          <template v-for="(rule, index) in rules" :key="index">
            <RuleItem
              v-if="rule.source !== 'basic'"
              :rule="rule.rule"
              :message="rule.message"
              :flag="rule.flag"
              :vertical="vertical"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pass-strength-validator {
  padding: 15px;

  .title-wrap {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    color: #1677ff;
  }

  .rules-title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
  }

  &.vertical {
    width: 1130px;
    padding: 18px 32px 24px;

    .title-wrap {
      margin-bottom: 16px;
      font-size: 16px;
    }

    .rules-wrap {
      display: flex;
    }

    .basic-rules,
    .advanced-rules {
      position: relative;
      flex: 1;
    }

    .basic-rules:after {
      position: absolute;
      top: 11px;
      right: 35px;
      bottom: 11px;
      width: 1px;
      height: auto;
      content: "";
      background: #e5e6eb;
    }

    .rules-title {
      margin-bottom: 14px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.dark .pass-strength-validator.vertical .basic-rules:after {
  background: #424242;
}
</style>
