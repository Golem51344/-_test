<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-12-04 18:31:56
 * @LastEditors: wsy
-->
<template>
  <kbd
    mr-4px
    h-6
    min-w-24px
    inline-flex
    items-center
    justify-center
    rounded
    bg-stone-1
    px-1
    text-12px
    text-dark
    font-medium
    font-sans
    ring-1
    ring-stone-3
    ring-inset
    last:mr-0
    dark:bg-dark-9
    dark:text-white
    dark:ring-stone-7
  >
    <slot />
  </kbd>
</template>
