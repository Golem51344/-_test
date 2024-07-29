<script setup lang="ts">
import AntDesignCheckCircleTwotone from '~icons/ant-design/check-circle-twotone';
import AntDesignCloseCircleTwotone from '~icons/ant-design/close-circle-twotone';

const props = defineProps<{
  rule: RegExp | ((...arg: any[]) => boolean)
  message: string
  flag: boolean
  source?: 'basic' | undefined
  vertical: boolean
}>();
</script>

<template>
  <div class="rule-item" :class="props.vertical ? 'vertical' : ''">
    <div class="icon">
      <AntDesignCheckCircleTwotone v-if="props.flag" text="16px green" />
      <AntDesignCloseCircleTwotone v-else text="16px red" />
    </div>
    <span :class="[props.flag ? 'line-through text-gray-400' : '']">
      {{ props.message }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .rule-item {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    font-size: 14px;
    line-height: 19px;

    .icon {
      margin-right: 10px;
      line-height: 23px;
    }

    &.vertical {
      padding: 0;
      margin-bottom: 6px;
      line-height: 18px;
      color: #86909c;

      .icon {
        margin-right: 6px;
        line-height: 18px;
      }
    }
  }
</style>
