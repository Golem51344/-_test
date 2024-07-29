<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    onIcon?: string
    offIcon?: string
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>();

const enabled = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <label class="switch">
    <input v-model="enabled" type="checkbox">
    <span />
  </label>
</template>

<style scoped lang="scss">
$greed: var(--ui-primary);

.switch {
  cursor: pointer;
  transform: scale(0.75);

  input {
    display: none;

    & + span {
      position: relative;
      display: block;
      width: 48px;
      height: 28px;
      background: #d6d3d1;
      border-radius: 14px;
      transition: all 0.3s ease;

      --at-apply: dark:bg-stone-5;

      &::before,
      &::after {
        position: absolute;
        display: block;
        content: "";
        transition: all 0.3s ease;
      }

      &::before {
        top: 5px;
        left: 5px;
        width: 18px;
        height: 18px;
        border: 5px solid #fff;
        border-radius: 9px;

        --at-apply: dark:border-dark;
      }

      &::after {
        top: 5px;
        left: 32px;
        width: 6px;
        height: 18px;
        background: #fff;
        border-radius: 40%;
        opacity: 0;
        transform-origin: 50% 50%;

        --at-apply: dark:bg-stone-7;
      }

      &:active {
        transform: scale(0.92);
      }
    }

    &:checked {
      & + span {
        background: rgb($greed);
        box-shadow: 0 8px 16px -1px rgba($greed, 0.2);

        &::before {
          width: 0;
          margin-left: 27px;
          background: #fff;
          border-width: 3px;
          border-radius: 3px;

          --at-apply: dark:bg-stone-7;
        }

        &::after {
          animation: blob-checked  0.35s linear forwards 0.2s;
        }
      }
    }

    &:not(:checked) {
      & + span {
        &::before {
          animation: blob 0.85s linear forwards 0.2s;
        }
      }
    }
  }
}

@keyframes blob {
  0%,
  100% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.12, 0.94);
  }

  60% {
    transform: scale(0.96, 1.06);
  }
}

@keyframes blob-checked {
  0% {
    opacity: 1;
    transform: scaleX(1);
  }

  30% {
    transform: scaleX(1.44);
  }

  70% {
    transform: scaleX(1.18);
  }

  50%,
  99% {
    opacity: 1;
    transform: scaleX(1);
  }

  100% {
    opacity: 0;
    transform: scaleX(1);
  }
}

html {
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;

  &::before,
  &::after {
    box-sizing: border-box;
  }
}
</style>
