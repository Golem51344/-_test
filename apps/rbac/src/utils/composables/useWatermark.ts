import watermark from '../watermark';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import eventBus from '@/utils/eventBus';

export default function useWatermark() {
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  const { init, remove } = watermark();

  eventBus.on('updateWatermark', () => {
    if (settingsStore.settings.watermark.enable) {
      loadWatermark();
      window.addEventListener('resize', loadWatermark);
    }
    else {
      removeWatermark();
      window.removeEventListener('resize', loadWatermark);
    }
  });

  watch(() => settingsStore.settings.app.colorScheme, () => {
    if (settingsStore.settings.watermark.enable) {
      loadWatermark();
    }
  }, { immediate: true });

  function getTextVal() {
    const type = settingsStore.settings.watermark.text;
    switch (type) {
      case 'U':
        return `${userStore.account}`;
      case 'O':
        return `${userStore.userOrgName}`;
      case 'OU':
        return `${userStore.userOrgName}  ${userStore.account}`;
      default:
        return type;
    }
  }

  function loadWatermark() {
    // 水印更多设置请查看 watermark.ts
    init({
      text: getTextVal(),
      width: settingsStore.settings.watermark.width, // 150
      x: settingsStore.settings.watermark.x, // 0
      y: settingsStore.settings.watermark.y, // 0
      x_space: settingsStore.settings.watermark.x_space, // 50
      y_space: settingsStore.settings.watermark.y_space, // 50
      alpha: settingsStore.settings.watermark.alpha, // 0.1
      color: settingsStore.settings.app.colorScheme === 'light' ? 'black' : 'white',
    });
  }

  function removeWatermark() {
    try {
      remove();
    }
    catch (err) {
      // 忽略报错
    }
  }

  return {
    loadWatermark,
    removeWatermark,
  };
}
