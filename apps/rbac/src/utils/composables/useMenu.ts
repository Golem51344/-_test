import { message } from 'ant-design-vue';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';
import type { Menu } from '#/menu.d.ts';

/**
 * 用于管理菜单功能的自定义组合函数。
 * @returns 一个包含 `switchTo` 函数的对象。
 */
export default function useMenu() {
  const router = useRouter();

  const settingsStore = useSettingsStore();
  const menuStore = useMenuStore();

  function switchTo(index: number | string, mainRouter?: Menu.recordMainRaw) {
    if (mainRouter && mainRouter.meta?.isDev) {
      message.info('暂未上线，敬请期待！');
      return;
    }
    menuStore.setActived(index);
    if (settingsStore.settings.menu.switchMainMenuAndPageJump) {
      router.push(menuStore.sidebarMenusFirstDeepestPath);
    }
  }

  return {
    switchTo,
  };
}
