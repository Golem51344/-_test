<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'DayNightSwitch',
});
const settingsStore = useSettingsStore();
</script>

<template>
  <label v-if="settingsStore.settings.toolbar.enableColorScheme" class="day-night">
    <div
      class="animate-icon"
      :class="{
        'animate-icon-day': settingsStore.settings.app.colorScheme !== 'dark',
      }"
    />
  </label>
</template>

<style lang="scss" scoped>
$night-btn: #fff;
$day-btn: #ffce6e;

.day-night {
  width: 44px;
  height: 44px;
  cursor: pointer;
  transform: scale(0.45);

  .animate-icon {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    box-shadow: inset 16px -16px 0 0 $night-btn;
    transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;
    transform: scale(1) rotate(-2deg);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      content: "";
      border-radius: inherit;
      transition: background 0.3s ease;
    }

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      margin: -4px 0 0 -4px;
      content: "";
      border-radius: 50%;
      box-shadow:
        0 -23px 0 $day-btn,
        0 23px 0 $day-btn,
        23px 0 0 $day-btn,
        -23px 0 0 $day-btn,
        15px 15px 0 $day-btn,
        -15px 15px 0 $day-btn,
        15px -15px 0 $day-btn,
        -15px -15px 0 $day-btn;
      transition: all 0.3s ease;
      transform: scale(0);
    }
  }

  .animate-icon-day {
    width: 44px;
    height: 44px;
    box-shadow: inset 32px -32px 0 0 $night-btn;
    transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;
    transform: scale(0.5) rotate(0deg);

    &::before {
      background: $day-btn;
      transition: background 0.3s ease 0.1s;
    }

    &::after {
      transition: transform 0.5s ease 0.15s;
      transform: scale(1.5);
    }
  }
}
</style>
