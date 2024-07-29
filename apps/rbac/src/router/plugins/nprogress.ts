import { useNProgress } from '@vueuse/integrations/useNProgress';
import useSettingsStore from '@/store/modules/settings';
import '@/assets/styles/nprogress.scss';

export function useProgress() {
  const { isLoading } = useNProgress();

  function enable() {
    const settingsStore = useSettingsStore();
    const enableProgress = settingsStore.settings.app.enableProgress;
    return enableProgress;
  }

  function closeProgress() {
    enable() && (isLoading.value = false);
  }
  function openProgress() {
    enable() && (isLoading.value = true);
  }
  return {
    closeProgress,
    openProgress,
  };
}
