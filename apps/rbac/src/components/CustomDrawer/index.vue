<script setup lang="ts">
defineOptions({
  name: 'CustomDrawer',
});
</script>

<template>
  <a-drawer class="drawer_custom" v-bind="$attrs">
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </a-drawer>
</template>

<style lang="scss">
.drawer_custom {
  .ant-drawer-header {
    padding: 12px 16px;
  }
  .ant-drawer-header-title {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .ant-drawer-title {
    flex: auto;
    font-weight: 500;
  }
  .ant-drawer-close {
    margin-inline-end: 0px;
  }
  .ant-drawer-body {
    padding: 16px 16px 16px 32px;
  }
  .ant-drawer-footer {
    padding: 16px 16px;
    .ant-btn {
      border-radius: 2px;
    }
  }
}
.form_custom {
  .ant-form-item .ant-form-item-label > label::after {
    content: "";
  }
  .ant-form-item .ant-form-item-label > label {
    color: #5c6673;
  }
  .ant-input {
    border-radius: 2px;
  }
  .ant-select-single .ant-select-selector {
    border-radius: 2px;
  }
  .ant-input-number {
    width: 100%;
    border-radius: 2px;
  }
}
</style>
