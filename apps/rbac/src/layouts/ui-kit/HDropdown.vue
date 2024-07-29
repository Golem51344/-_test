<template>
  <VDropdown
    :triggers="['click']"
    :popper-triggers="['hover']"
    :delay="200"
    v-bind="$attrs"
  >
    <slot />
    <template #popper>
      <slot name="dropdown" />
    </template>
  </VDropdown>
</template>
