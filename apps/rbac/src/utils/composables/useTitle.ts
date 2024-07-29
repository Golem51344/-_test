import { useI18n } from 'vue-i18n';
import useSettingsStore from '@/store/modules/settings';

export function useTitle() {
  const settingsStore = useSettingsStore();
  const { t, te } = useI18n();
  const routeInfo = useRoute();
  watch(
    [
      () => settingsStore.settings.app.enableDynamicTitle,
      () => settingsStore.title,
      () => settingsStore.customTitleList,
    ],
    () => {
      if (settingsStore.settings.app.enableDynamicTitle && settingsStore.title) {
        const title = settingsStore.customTitleList.find(item => item.fullPath === routeInfo.fullPath)?.title
          || (
            settingsStore.settings.app.routeBaseOn !== 'filesystem'
              ? routeInfo.meta.breadcrumbNeste?.at(-1)?.i18n
                ? generateI18nTitle(routeInfo.meta.breadcrumbNeste?.at(-1)?.i18n, settingsStore.title)
                : generateI18nTitle(routeInfo.meta.i18n, settingsStore.title)
              : generateI18nTitle(routeInfo.meta.i18n, settingsStore.title)
          );
        document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`;
      }
      else {
        document.title = import.meta.env.VITE_APP_TITLE;
      }
    },
    {
      deep: true,
    });
  function generateI18nTitle(key: string | undefined, defaultTitle: string | (() => any) = t('route.undefined')) {
    return (settingsStore.settings.toolbar.enableI18n && !!key && te(key))
      ? t(key)
      : typeof defaultTitle === 'function'
        ? defaultTitle()
        : defaultTitle;
  }
  return {
    generateI18nTitle,
  };
}
