import type { App } from 'vue';
import Waves from 'node-waves';
import 'node-waves/dist/waves.min.css';

export function setupWaves(app: App) {
  app.directive('waves', {
    created: () => {
      Waves.init();
    },
    mounted: (el, binding) => {
      const classes = ['button', 'circle', 'block', 'float', 'light', 'classic'].filter(cls => binding.modifiers[cls]).map(cls => `waves-${cls}`);
      Waves.attach(el, classes);
    },
  });
}
