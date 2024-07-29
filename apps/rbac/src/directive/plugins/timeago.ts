import type { App } from 'vue';

export function setupTimeago(app: App) {
  app.directive('timeago', {
    mounted: (el, binding) => {
      el.textContent = useTimeago().format(binding.value);
      if (binding.modifiers.interval) {
        el.__timeagoSetInterval__ = setInterval(() => {
          el.textContent = useTimeago().format(binding.value);
        }, 1000);
      }
    },
    beforeUnmount: (el, binding) => {
      if (binding.modifiers.interval) {
        clearInterval(el.__timeagoSetInterval__);
      }
    },
  });
}
