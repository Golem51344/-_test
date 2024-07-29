import useSettingsStore from '@/store/modules/settings';
import useTabbarStore from '@/store/modules/tabbar';

/**
 * 用于主页面功能的自定义钩子。
 * @returns 包含以下函数的对象：
 *   - reload: 重新加载当前页面。
 *   - setCustomTitle: 为当前页面设置自定义标题。
 *   - resetCustomTitle: 重置当前页面的自定义标题。
 *   - maximize: 设置主页面的最大化状态。
 */
export default function useMainPage() {
  const route = useRoute();
  const router = useRouter();

  const settingsStore = useSettingsStore();
  const tabbarStore = useTabbarStore();

  const tabbar = useTabbar();

  /**
   * 重新加载当前页面，通过导航到 'reload' 路由。
   */
  function reload() {
    router.push({
      name: 'reload',
    });
  }

  /**
   * 设置自定义标题
   * @param title - 标题字符串
   */
  function setCustomTitle(title: string) {
    settingsStore.setCustomTitle(route.fullPath, title);
    if (settingsStore.settings.tabbar.enable) {
      tabbarStore.setCustomTitle({
        tabId: tabbar.getId(),
        title,
      });
    }
  }

  /**
   * 重置自定义标题
   */
  function resetCustomTitle() {
    settingsStore.resetCustomTitle(route.fullPath);
    if (settingsStore.settings.tabbar.enable) {
      tabbarStore.resetCustomTitle(tabbar.getId());
    }
  }

  /**
   * 最大化或还原主页面，根据给定的状态。
   * @param status - 表示是否最大化或还原主页面的状态。
   */
  function maximize(status: boolean) {
    settingsStore.setMainPageMaximize(status);
  }

  return {
    reload,
    setCustomTitle,
    resetCustomTitle,
    maximize,
  };
}
