import type { ObjectDirective } from 'vue';
import mediumZoom from 'medium-zoom';

const zoomable: ObjectDirective = {
  mounted: (el) => {
    mediumZoom(el, {
      background: 'rgba(0, 0, 0, 0.5)',
      scrollOffset: 0,
      margin: 80,
    });
  },
};

export { zoomable };
