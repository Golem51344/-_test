import hotkeys from 'hotkeys-js';
import eventBus from '@/utils/eventBus';
import useSettingsStore from '@/store/modules/settings';

/**
 * 注册全局系统信息。
 */
export function registerGlobalSystemInfo() {
  const settingsStore = useSettingsStore();
  onMounted(() => {
    settingsStore.setMode(document.documentElement.clientWidth);
    window.onresize = () => {
      settingsStore.setMode(document.documentElement.clientWidth);
    };
    hotkeys('alt+i', () => {
      eventBus.emit('global-system-info-toggle');
    });
  });
}
