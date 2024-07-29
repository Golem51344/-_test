import type { App } from 'vue';
import useCreateRouter from './utils/createRouter';
import useSettingsStore from '@/store/modules/settings';
import { registerNavigation } from '@/router/guard/index';

const router = useCreateRouter();

registerNavigation(router, {
  enableProgress: () => {
    const settingsStore = useSettingsStore();
    return settingsStore.settings.app.enableProgress;
  },
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
