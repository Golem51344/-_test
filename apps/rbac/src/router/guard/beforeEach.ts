import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import { asyncRoutes, asyncRoutesByFilesystem } from '@/router/routes';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import useRouteStore from '@/store/modules/route';
import useMenuStore from '@/store/modules/menu';
import useTabbarStore from '@/store/modules/tabbar';
import useIframeStore from '@/store/modules/iframe';
import useFavoritesStore from '@/store/modules/favorites';

export function beforeNavigationGuard(router: Router, useCallBack?: (...arg: any) => void | Promise<void>) {
  async function navigationGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    const menuStore = useMenuStore();
    const tabbarStore = useTabbarStore();
    const iframeStore = useIframeStore();
    const favoritesStore = useFavoritesStore();

    if (typeof useCallBack === 'function') {
      await useCallBack();
    }

    // 前往单点登录前，清空登录状态
    if (to.name === 'Auth') {
      userStore.clean();
    }

    // 是否已登录
    if (userStore.isLogin) {
      // 是否已根据权限动态生成并注册路由
      if (routeStore.isGenerate) {
        // 生成 iframe 列表
        if (!iframeStore.isGenerate) {
          await iframeStore.generateList(router.getRoutes());
        }
        // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
        settingsStore.settings.menu.menuMode !== 'single' && menuStore.setActived(to.path);
        // 如果已登录状态下，进入登录页会强制跳转到主页
        if (to.name === 'login') {
          next({
            name: 'home',
            replace: true,
          });
        }
        // 如果未开启主页，但进入的是主页，则会进入第一个固定标签页或者侧边栏导航第一个模块
        else if (!settingsStore.settings.home.enable && to.name === 'home') {
          const firstPin = tabbarStore.list.find(v => v.isPin);
          if (settingsStore.settings.tabbar.enable && firstPin) {
            next({
              path: firstPin.fullPath,
              replace: true,
            });
          }
          else if (menuStore.sidebarMenus.length > 0) {
            next({
              path: menuStore.sidebarMenusFirstDeepestPath,
              replace: true,
            });
          }
          // 如果第一个固定标签页和侧边栏导航第一个模块均无法命中，则还是进入主页
          else {
            next();
          }
        }
        // 正常访问页面
        else {
          next();
        }
      }
      else {
        // 获取用户偏好设置
        if (settingsStore.settings.app.enableSettingPreferences) {
          await userStore.getPreferencesAll();
        }

        // 获取用户组织列表

        await userStore.getOrgList();

        // 复原固定标签页
        settingsStore.settings.tabbar.enable && await tabbarStore.recoveryStorage();
        // 复原收藏夹
        settingsStore.settings.favorites.enable && await favoritesStore.recoveryStorage();
        // 生成动态路由
        switch (settingsStore.settings.app.routeBaseOn) {
          case 'frontend':
            await routeStore.generateRoutesAtFront(asyncRoutes);
            break;
          case 'backend':
            await routeStore.generateRoutesAtBack();
            break;
          case 'filesystem':
            await routeStore.generateRoutesAtFilesystem(asyncRoutesByFilesystem);
            // 文件系统生成的路由，需要手动生成导航数据
            switch (settingsStore.settings.menu.baseOn) {
              case 'frontend':
                await menuStore.generateMenusAtFront();
                break;
              case 'backend':
                await menuStore.generateMenusAtBack();
                break;
            }
            break;
        }
        // 判断是否没有任何权限啊
        if (!routeStore.routes.length) {
          // 进去无权限页面
          return next({
            name: 'NotPermission',
          });
        }
        // 注册并记录路由数据
        // 记录的数据会在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name
        // 则通过调用 router.addRoute() 返回的回调进行删除
        const removeRoutes: Array<{
          (): void
          system?: boolean
        }> = [];
        routeStore.flatRoutes.forEach((route) => {
          if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
            removeRoutes.push(router.addRoute(route));
          }
        });
        if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
          routeStore.flatSystemRoutes.forEach((route) => {
            const removeRoute: {
              (): void
              system?: boolean
            } = router.addRoute(route);
            removeRoute.system = true;
            removeRoutes.push(removeRoute);
          });
        }
        routeStore.setCurrentRemoveRoutes(removeRoutes);
        // 动态路由生成并注册后，重新进入当前路由
        next({
          path: to.path,
          query: to.query,
          replace: true,
        });
      }
    }
    else {
      if (!to?.meta?.whiteList) {
        next({
          name: 'login',
          query: {
            redirect: to.fullPath !== '/' ? to.fullPath : undefined,
          },
        });
      }
      else {
        next();
      }
    }
  }

  router.beforeEach(navigationGuard);
}
