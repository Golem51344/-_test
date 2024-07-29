import { cloneDeep, get, isArray, isNumber, isString } from 'lodash-es';

import { defineStore } from 'pinia';
import { STORE_NAME } from '@/store/enum';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import useRouteStore from '@/store/modules/route';

import { resolveRoutePath } from '@/utils';
import menu from '@/menu';
import type { Menu } from '#/menu';

/**
 * 用于管理与菜单相关数据的自定义存储。
 *
 * @returns 包含与菜单相关的各种计算属性和函数的对象。
 */
const useMenuStore = defineStore(
  STORE_NAME.MENU,
  () => {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    const menus = ref<Menu.recordMainRaw[]>([{
      meta: {},
      children: [],
    }]);
    const actived = ref(0);

    /**
     * 通过根据基本路径解析菜单项的相对路径，将其转换为完整路径
     * @param menu - 要转换的菜单数组。
     * @param path - 用于解析相对路径的基本路径。默认为空字符串。
     * @returns 具有转换后的完整路径的菜单数组。
     * @example
     * // Example usage:
     * const menu = [
     *   { path: 'home', title: 'Home' },
     *   { path: 'about', title: 'About' },
     * ];
     * const basePath = '/app';
     * const convertedMenu = convertToFullPath(menu, basePath);
     * console.log(convertedMenu);
     * // Output:
     * // [
     * //   { path: '/app/home', title: 'Home' },
     * //   { path: '/app/about', title: 'About' },
     * // ]
     */
    function convertToFullPath(menu: any[], path: string = '') {
      return menu.map((item) => {
        item.path = resolveRoutePath(path, item.path);
        if (item.children) {
          item.children = convertToFullPath(item.children, item.path);
        }
        return item;
      });
    }

    /**
     * 获取所有菜单项
     * @returns 所有菜单项的数组
     */
    const allMenus = computed(() => {
      let returnMenus: Menu.recordMainRaw[] = [{
        meta: {},
        children: [],
      }];
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        if (settingsStore.settings.menu.menuMode === 'single') {
          returnMenus[0].children = [];
          routeStore.routes.forEach((item) => {
            if (!get(item, 'meta.isDev', false)) {
              returnMenus[0].children?.push(...item.children as Menu.recordRaw[]);
            }
            else {
              _DEV_ && useWarn(`侧边栏模式(不含主导航)下省略${item.meta.title}的子集菜单，因为该菜单开启了isDev属性。`);
            }
          });
        }
        else {
          returnMenus = routeStore.routes as Menu.recordMainRaw[];
        }
        returnMenus.map(item => convertToFullPath(item.children));
      }
      else {
        returnMenus = menus.value;
      }
      return returnMenus;
    });

    /**
     * 侧边栏菜单的计算属性。
     * @returns {Menu.recordMainRaw['children']} 当前活动菜单的子菜单，如果没有菜单则返回空数组。
     */
    const sidebarMenus = computed<Menu.recordMainRaw['children']>(() => {
      const tempAllMenus = allMenus.value.filter(item => !get(item, 'meta.isDev', false));
      if (tempAllMenus.length > 0) {
        if (tempAllMenus.length > 1) {
          while (get(allMenus.value[actived.value], 'meta.isDev', false) && actived.value < allMenus.value.length - 1) {
            actived.value++;
          }
          return allMenus.value[actived.value].children;
        }
        else {
          return get(allMenus.value[0], 'meta.isDev', false) ? [] : allMenus.value[0].children;
        }
      }
      else {
        return [];
      }
    });

    /**
     * TODO: 如果第一个菜单是一个isDev为true的菜单，那么这个计算属性可能会出现问题
     * 返回第一个侧边栏菜单的最深路径的计算属性。
     *
     * @returns {string} 第一个侧边栏菜单的最深路径，如果没有侧边栏菜单则返回'/'。
     */
    const sidebarMenusFirstDeepestPath = computed(() => {
      return sidebarMenus.value.length > 0
        ? getDeepestPath(sidebarMenus.value[0])
        : '/';
    });

    /**
     * 获取最深层级的路径
     * @param menu 菜单对象
     * @param rootPath 根路径
     * @returns 最深层级的路径
     */
    function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
      let retnPath = '';
      if (menu.children) {
        const item = menu.children.find(item => item.meta?.sidebar !== false);
        if (item) {
          retnPath = getDeepestPath(item, resolveRoutePath(rootPath, menu.path));
        }
        else {
          retnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path));
        }
      }
      else {
        retnPath = resolveRoutePath(rootPath, menu.path);
      }
      return retnPath;
    }

    /**
     * 默认打开的路径计算属性。
     * @returns 一个字符串数组，表示默认打开的路径。
     */
    const defaultOpenedPaths = computed(() => {
      const defaultOpenedPaths: string[] = [];
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        allMenus.value.forEach((item) => {
          defaultOpenedPaths.push(...getDefaultOpenedPaths(item.children));
        });
      }
      return defaultOpenedPaths;
    });

    /**
     * 获取默认展开的路径数组
     * @param menus 菜单数据
     * @param rootPath 根路径
     * @returns 默认展开的路径数组
     */
    function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
      const defaultOpenedPaths: string[] = [];
      menus.forEach((item) => {
        if (item.meta?.defaultOpened && item.children) {
          defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path));
          const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path));
          if (childrenDefaultOpenedPaths.length > 0) {
            defaultOpenedPaths.push(...childrenDefaultOpenedPaths);
          }
        }
      });
      return defaultOpenedPaths;
    }

    /**
     * 确定用户是否有权限访问菜单项。
     * @param permissions - 用户的权限。
     * @param menu - 要检查的菜单项。
     * @returns 如果用户有权限，则返回true，否则返回false。
     */
    function hasPermission(permissions: string[], menu: Menu.recordMainRaw | Menu.recordRaw) {
      let isAuth = false;
      if (menu.meta?.auth) {
        const auth = menu.meta.auth;
        isAuth = permissions.some((permissionsAuth) => {
          if (isString(auth)) {
            return auth !== '' ? auth === permissionsAuth : true;
          }
          else if (isArray(auth)) {
            return auth.length > 0 ? auth.includes(permissionsAuth) : true;
          }
          else {
            return false;
          }
        });
      }
      else {
        isAuth = true;
      }
      return isAuth;
    }

    /**
     * 根据给定的权限过滤菜单。
     *
     * @template T - 菜单数组的类型。
     * @param {T} menus - 要过滤的菜单数组。
     * @param {string[]} permissions - 要检查的权限数组。
     * @returns {T} - 过滤后的菜单数组。
     */
    function filterAsyncMenus<T extends Menu.recordMainRaw[] | Menu.recordRaw[]>(menus: T, permissions: string[]) {
      const res: Array<Menu.recordMainRaw | Menu.recordRaw> = [];
      menus.forEach((menu) => {
        if (hasPermission(permissions, menu)) {
          const tmpMenu = cloneDeep(menu);
          if (tmpMenu.children) {
            tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions);
            tmpMenu.children.length && res.push(tmpMenu);
          }
          else {
            res.push(tmpMenu);
          }
        }
      });
      return res as T;
    }

    /**
     * 生成前端菜单
     * @returns {Promise<void>} 无返回值
     */
    async function generateMenusAtFront() {
      let accessedMenus;
      // 如果权限功能开启，则需要对导航数据进行筛选过滤
      if (settingsStore.settings.app.enablePermission) {
        const permissions = await userStore.getPermissions();
        accessedMenus = filterAsyncMenus(menu, permissions);
      }
      else {
        accessedMenus = cloneDeep(menu);
      }
      menus.value = accessedMenus.filter(item => item.children.length !== 0);
    }

    /**
     * 生成后端菜单
     * @returns {Promise<void>} 生成菜单的异步函数
     */
    async function generateMenusAtBack() {
      try {
        const backRoute = await GetApiMenuList();
        const settingsStore = useSettingsStore();
        const userStore = useUserStore();
        let accessedMenus: Menu.recordMainRaw[];
        if (settingsStore.settings.app.enablePermission) {
          const permissions = await userStore.getPermissions();
          accessedMenus = filterAsyncMenus(backRoute.data, permissions);
        }
        else {
          accessedMenus = cloneDeep(backRoute.data);
        }
        menus.value = accessedMenus.filter(item => item.children.length !== 0);
      }
      catch (error) {
        console.error(error);
      }
    }

    /**
     * 设置活动项
     * @param data - 活动项的索引或路由
     */
    function setActived(data: number | string) {
      if (isNumber(data)) {
        // 如果是 number 类型，则认为是主导航的索引
        actived.value = data;
      }
      else {
        // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
        const findIndex = allMenus.value.findIndex(item => item.children.some(r => data.indexOf(`${r.path}/`) === 0 || data === r.path));
        if (findIndex >= 0) {
          actived.value = findIndex;
        }
      }
    }

    return {
      menus,
      actived,
      allMenus,
      sidebarMenus,
      sidebarMenusFirstDeepestPath,
      defaultOpenedPaths,
      generateMenusAtFront,
      generateMenusAtBack,
      setActived,
    };
  },
);

export default useMenuStore;
