import useSettingsStore from '@/store/modules/settings';

export function useTheme() {
  const settingsStore = useSettingsStore();

  const isDark = computed({
    get() {
      return settingsStore.settings.app.colorScheme === 'dark';
    },
    set(value) {
      settingsStore.settings.app.colorScheme = (value ? 'dark' : 'light');
    },
  });
  return { isDark };
}
