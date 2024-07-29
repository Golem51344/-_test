import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';
import useRouteStore from '@/store/modules/route';
import useMenuStore from '@/store/modules/menu';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import { STORE_NAME } from '@/store/enum';
import { resolveRoutePath } from '@/utils';
import storage from '@/utils/storage';
import type { Menu } from '#/menu';
import type { Favorites } from '#/favorites';
import { GetAPIFavorites, GetAPIFavoritesEdit } from '@/api/system/user';
import { getfavoritesMemoryKey } from '@/store/helper';

/**
 * 用于管理收藏夹的自定义存储。
 *
 * @returns 包含各种函数和响应式属性以管理收藏夹的对象。
 */
const useFavoritesStore = defineStore(
  STORE_NAME.FAVORITES,
  () => {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    const menuStore = useMenuStore();

    const list = ref<Favorites.recordRaw[]>([]);

    /**
     * 判断路由项是否有子项
     * @param item 路由项
     * @returns 返回布尔值，表示是否有子项
     */
    function hasChildren(item: RouteRecordRaw) {
      let flag = true;
      if (item.children?.every(i => i.meta?.sidebar === false)) {
        flag = false;
      }
      return flag;
    }

    /**
     * 获取源列表
     * @param arr 路由记录数组
     * @param basePath 基础路径
     * @returns 源列表
     * @example
     * const routes: RouteRecordRaw[] = [
     *   {
     *     path: '/home',
     *     component: Home,
     *     meta: { sidebar: true },
     *     children: [
     *       { path: '/dashboard', component: Dashboard, meta: { sidebar: true } },
     *       { path: '/profile', component: Profile, meta: { sidebar: true } },
     *     ],
     *   },
     *   { path: '/about', component: About, meta: { sidebar: false } },
     * ];
     * const basePath = '/home';
     * const sourceList = getSourceList(routes, basePath);
     * console.log(sourceList); // Output: ['/home/dashboard', '/home/profile']
     */
    function getSourceList(arr: RouteRecordRaw[], basePath?: string) {
      const list: string[] = [];
      for (const item of arr) {
        if (item.meta?.sidebar !== false) {
          if (item.children && hasChildren(item)) {
            list.push(...getSourceList(item.children, resolveRoutePath(basePath, item.path)));
          }
          else {
            list.push((item.redirect as string) ?? resolveRoutePath(basePath, item.path));
          }
        }
      }
      return list;
    }

    /**
     * 获取菜单列表中的所有路径
     * @param arr 菜单列表
     * @returns 所有路径列表
     * @example
     * const menus: Menu.recordRaw[] = [
     *   {
     *     path: '/home',
     *     children: [
     *       {
     *         path: '/dashboard',
     *         children: [
     *           {
     *             path: '/overview',
     *           },
     *           {
     *             path: '/analytics',
     *           },
     *         ],
     *       },
     *       {
     *         path: '/profile',
     *       },
     *     ],
     *   },
     * ];
     * const sourceList = getSourceListByMenus(menus);
     * console.log(sourceList); // Output: ["/home", "/dashboard", "/overview", "/analytics", "/profile"]
     */
    function getSourceListByMenus(arr: Menu.recordRaw[]) {
      const list: string[] = [];
      for (const item of arr) {
        if (item.children && item.children.length > 0) {
          list.push(...getSourceListByMenus(item.children));
        }
        else {
          list.push(item.path!);
        }
      }
      return list;
    }

    /**
     * 获取扁平化的侧边栏菜单列表
     *
     * @returns {string[]} 扁平化的侧边栏菜单列表
     */
    const flatSidebarMenu = computed(() => {
      const list: string[] = [];
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        routeStore.routes.forEach((item) => {
          item.children && list.push(...getSourceList(item.children as RouteRecordRaw[]));
        });
      }
      else {
        menuStore.menus.forEach((item) => {
          list.push(...getSourceListByMenus(item.children));
        });
      }
      return list;
    });

    /**
     * 确定给定的fullPath是否可以添加到收藏夹。
     * @param fullPath - 要检查的fullPath。
     * @returns 如果可以添加到收藏夹，则为true；否则为false。
     */
    function canAdd(fullPath: Favorites.recordRaw['fullPath']) {
      return flatSidebarMenu.value.includes(fullPath);
    }

    /**
     * 判断是否已添加到收藏夹
     * @param fullPath 完整路径
     * @returns 如果已添加返回true，否则返回false
     */
    function isAdd(fullPath: Favorites.recordRaw['fullPath']) {
      return list.value.some(item => item.fullPath === fullPath);
    }

    /**
     * 添加收藏夹项
     * @param {RouteLocationNormalized} route - 路由对象
     */
    function add(route: RouteLocationNormalized) {
      const meta = route.matched.at(-1)?.meta;
      if (!list.value.find(item => item.fullPath === route.fullPath)) {
        list.value.push({
          fullPath: route.fullPath,
          title: meta?.title,
          i18n: meta?.i18n,
          icon: meta?.icon ?? meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
        });
      }
      updateStorage();
    }

    /**
     * 从收藏夹中移除一个项目。
     * @param fullPath 要移除的项目的完整路径。
     */
    function remove(fullPath: Favorites.recordRaw['fullPath']) {
      list.value = list.value.filter((item) => {
        return item.fullPath !== fullPath;
      });
      updateStorage();
    }

    /**
     * 将列表中的项目从旧索引移动到新索引，以对项目进行排序。
     * @param newIndex - 应将项目移动到的新索引。
     * @param oldIndex - 应移动的项目的旧索引。
     */
    function sort(newIndex: number, oldIndex: number) {
      list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0]);
      updateStorage();
    }

    /**
     * 更新存储
     */
    async function updateStorage() {
      if (settingsStore.settings.favorites.storageTo === 'local') {
        const favoritesMemoryKey = getfavoritesMemoryKey();
        const favoritesData = storage.local.has(favoritesMemoryKey) ? JSON.parse(storage.local.get(favoritesMemoryKey) as string) : {};
        favoritesData[userStore.account] = list.value;
        storage.local.set(favoritesMemoryKey, JSON.stringify(favoritesData));
      }
      else if (settingsStore.settings.favorites.storageTo === 'server') {
        await GetAPIFavoritesEdit(JSON.stringify(list.value));
      }
    }

    /**
     * 从存储中恢复收藏夹数据
     */
    async function recoveryStorage() {
      if (settingsStore.settings.favorites.storageTo === 'local') {
        const favoritesMemoryKey = getfavoritesMemoryKey();
        if (storage.local.has(favoritesMemoryKey)) {
          list.value = JSON.parse(storage.local.get(favoritesMemoryKey) as string)[userStore.account] || [];
        }
      }
      else if (settingsStore.settings.favorites.storageTo === 'server') {
        const res = await GetAPIFavorites();
        list.value = JSON.parse(res.data.favorites || '[]');
      }
    }
    return {
      list,
      canAdd,
      isAdd,
      add,
      remove,
      sort,
      recoveryStorage,
    };
  },
);

export default useFavoritesStore;
