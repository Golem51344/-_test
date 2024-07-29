import { cloneDeep, defaultTo, get, has, isArray, isString, isUndefined, merge, omit } from 'lodash-es';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import useTabbarStore from '@/store/modules/tabbar';
import { STORE_NAME } from '@/store/enum';
import { resolveRoutePath } from '@/utils';
import { systemRoutes } from '@/router/routes';
import { useWarn } from '@/composables/log';
import type { Route } from '#/vue-router';

const useRouteStore = defineStore(
  STORE_NAME.ROUTE,
  () => {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const tabbarStore = useTabbarStore();

    const isGenerate = ref(false);
    const routesRaw = ref<Route.recordMainRaw[]>([]);
    const filesystemRoutesRaw = ref<RouteRecordRaw[]>([]);
    const currentRemoveRoutes = ref<Array<{
      (): void
      system?: boolean
    }>>([]);

    /**
     * 创建面包屑对象
     * @param currentRouter 当前路由对象
     * @param baseUrl 基础路径
     * @returns 面包屑对象
     */
    function createBreadcrumb(currentRouter: RouteRecordRaw, baseUrl?: RouteRecordRaw['path']): Route.breadcrumb {
      const { title, i18n, icon, activeIcon, breadcrumb = true } = defaultTo(currentRouter.meta, {} as RouteMeta);
      const path = defaultTo(baseUrl, currentRouter.path);
      return {
        path,
        title,
        i18n,
        icon,
        activeIcon,
        hide: !breadcrumb,
      };
    }

    /**
     * 创建路由
     * @param rawRoute 原始路由
     * @param baseUrl 基础路径
     * @param auth 路由元数据中的权限
     * @param breadcrumb 路由面包屑
     * @returns 创建的路由
     */
    function createRoute(rawRoute: RouteRecordRaw, baseUrl: RouteRecordRaw['path'], auth: RouteMeta['auth'], breadcrumb: Route.breadcrumb[]) {
      const breadcrumbStack = cloneDeep(breadcrumb);
      const currentBreadcrumb = createBreadcrumb(rawRoute, baseUrl);
      breadcrumbStack.push(currentBreadcrumb);

      function removeChildren(route: RouteRecordRaw) {
        if (has(route, 'children')) {
          return omit(route, 'children');
        }
        return route;
      }

      const needMergeRouteRawData = {
        path: baseUrl,
        meta: {
          auth,
          breadcrumbNeste: breadcrumbStack,
        },
      };
      const raw = toRaw(rawRoute);
      const cloned = cloneDeep(raw);
      const cleaned = removeChildren(cloned);
      const finalRoute = merge(cleaned, needMergeRouteRawData) as RouteRecordRaw;
      return finalRoute;
    }

    /**
     * 递归地展开系统路由，同时创建面包屑。
     * @param route - 要展开的路由。
     * @returns 展开后的路由。
     */
    function flattenSystemRoutes<T extends RouteRecordRaw>(route: T): T {
      if (route.children) {
        route.children = flattenAsyncRoutesRecursive(
          route.children,
          [createBreadcrumb(route)],
          route.path,
          route.meta?.auth,
        );
      }
      return route;
    }

    /**
     * 递归地将异步路由扁平化。
     *
     * @param rawRoutes - 要扁平化的原始路由。
     * @param breadcrumb - 当前路由的面包屑。
     * @param baseUrl - 当前路由的基本URL。
     * @param baseAuth - 当前路由的基本身份验证。
     * @returns 扁平化后的路由。
     */
    function flattenAsyncRoutesRecursive(
      rawRoutes: RouteRecordRaw[],
      breadcrumb: Route.breadcrumb[] = [],
      baseUrl = '',
      baseAuth: RouteMeta['auth']): RouteRecordRaw[] {
      return toRaw(rawRoutes).reduce<RouteRecordRaw[]>((flatRoute, rawRoute) => {
        const childrenBaseUrl = resolveRoutePath(baseUrl, rawRoute.path);
        const childrenBaseAuth = defaultTo(rawRoute.meta?.auth, baseAuth);
        const route = createRoute(rawRoute,
          childrenBaseUrl,
          childrenBaseAuth,
          breadcrumb,
        );
        flatRoute.push(route);

        if (rawRoute.children) {
          const childrenRoutes = flattenAsyncRoutesRecursive(
            rawRoute.children,
            route?.meta?.breadcrumbNeste,
            childrenBaseUrl,
            childrenBaseAuth,
          );

          childrenRoutes.forEach((item) => {
            if (flatRoute.some(v => v.path === item.path)) {
              flatRoute.forEach((v, i) => {
                if (v.path === item.path) {
                  flatRoute[i] = item;
                }
              });
            }
            else {
              flatRoute.push(item);
            }
          });
        }
        return flatRoute;
      }, []);
    }

    /**
     * 计算属性，返回扁平化的路由。
     * 扁平化的路由是通过合并原始路由中每个路由的子路由而获得的。
     * 如果应用的 routeBaseOn 设置为 'filesystem'，则扁平化的路由是从 filesystemRoutesRaw 值中获取的。
     * 否则，扁平化的路由是通过合并 routesRaw 值中每个路由的子路由而获得的。
     * @returns {RouteRecordRaw[]} 扁平化的路由。
     */
    const flatRoutes = computed(() => {
      const flatRoutesRaw: RouteRecordRaw[] = [];
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        if (routesRaw.value.length) {
          routesRaw.value.forEach((item) => {
            // TODO: 兼容写法，垫补后续逻辑需要有 children
            if (item.children?.length) {
              let tmpRoutes = cloneDeep(item.children);
              tmpRoutes = tmpRoutes.map((childrenRoute) => {
                return merge(
                  childrenRoute,
                  {
                    meta: {
                      auth: defaultTo(
                        childrenRoute.meta?.auth,
                        item.meta?.auth,
                      ),
                    },
                  },
                );
              });
              flatRoutesRaw.push(...tmpRoutes);
            }
          });
          flatRoutesRaw.forEach(item => flattenSystemRoutes(item));
        }
      }
      else {
        flatRoutesRaw.push(...cloneDeep(filesystemRoutesRaw.value));
      }
      return flatRoutesRaw;
    });

    /**
     * 获取扁平化的系统路由。
     * @returns {Array<RouteRecordRaw>} 扁平化的系统路由。
     */
    const flatSystemRoutes = computed(() => {
      const routes = [...systemRoutes];
      routes.forEach(item => flattenSystemRoutes(item));
      return routes;
    });

    /**
     * 确定用户是否有权限访问特定路由。
     * @param permissions - 用户的权限。
     * @param route - 要检查权限的路由。
     * @returns 一个布尔值，指示用户是否有权限。
     */
    function hasPermission(permissions: string[], route: Route.recordMainRaw | RouteRecordRaw) {
      if (isUndefined(route.meta?.auth)) {
        return true;
      }
      const auth = route.meta.auth;
      return toRaw(permissions).some((permissionCode) => {
        if (isString(auth)) {
          return auth !== ''
            ? auth === permissionCode
            : true;
        }
        else if (isArray(auth)) {
          return auth.length !== 0
            ? auth.includes(permissionCode)
            : true;
        }
        else {
          useWarn('路由权限类型配置错误, 请检查路由 meta.auth');
          return false;
        }
      });
    }

    /**
     * 根据提供的权限过滤异步路由。
     *
     * @template T - 路由数组的类型。
     * @param {T} routes - 要过滤的路由数组。
     * @param {string[]} permissions - 要检查的权限。
     * @returns {T} - 过滤后的路由数组。
     */
    function filterAsyncRoutes<T extends Array<Route.recordMainRaw | RouteRecordRaw>>(routes: T, permissions: string[]): T {
      const res: Array<Route.recordMainRaw | RouteRecordRaw> = [];
      routes.forEach((route) => {
        if (hasPermission(permissions, route)) {
          const tmpRoute = cloneDeep(route);
          if (tmpRoute.children) {
            tmpRoute.children = filterAsyncRoutes(tmpRoute.children, permissions);
            if (tmpRoute.children.length || get(tmpRoute, 'meta.isDev', false)) {
              res.push(tmpRoute);
            }
          }
          else {
            // TODO: 兼容写法，垫补后续逻辑需要有 children
            if (get(tmpRoute, 'meta.isDev', false)) {
              tmpRoute.children = [];
            }
            res.push(tmpRoute);
          }
        }
      });
      return res as T;
    }

    /**
     * 计算属性，根据用户权限返回筛选后的路由。
     * 如果权限功能已启用，则对路由进行筛选。
     * 否则，原样返回路由。
     *
     * @returns {Route.recordMainRaw[]} 筛选后的路由。
     */
    const routes = computed(() => {
      let returnRoutes: Route.recordMainRaw[];
      // 如果权限功能开启，则需要对路由数据进行筛选过滤
      if (settingsStore.settings.app.enablePermission) {
        returnRoutes = filterAsyncRoutes(routesRaw.value, userStore.permissions);
      }
      else {
        returnRoutes = cloneDeep(routesRaw.value);
      }
      return returnRoutes;
    });

    // 将设置 meta.singleMenu 的一级路由转换成二级路由
    function convertSingleRoutes<T extends Route.recordMainRaw[]>(routes: T): T {
      routes.map((route) => {
        if (route.children) {
          route.children.forEach((item, index, arr) => {
            if (item.meta?.singleMenu) {
              arr[index] = {
                ...item,
                component: () => import('@/layouts/index.vue'),
                children: [
                  {
                    path: '',
                    component: item.component,
                    meta: {
                      title: item.meta.title,
                      i18n: item.meta.i18n,
                      sidebar: false,
                      breadcrumb: false,
                    },
                  },
                ],
              } as RouteRecordRaw;
              delete arr[index].meta!.singleMenu;
            }
          });
        }
        return route;
      });
      return routes;
    }
    /**
     * 生成前端路由
     * @param asyncRoutes 异步路由配置
     */
    async function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      // 设置 routes 数据
      routesRaw.value = convertSingleRoutes(cloneDeep(asyncRoutes));
      if (settingsStore.settings.app.enablePermission) {
        await userStore.getPermissions();
      }
      isGenerate.value = true;
      // 加载常驻标签页
      if (settingsStore.settings.tabbar.enable) {
        tabbarStore.initPermanentTab();
      }
    }

    /**
     * 格式化后端返回的路由数据
     * @param routes 路由数据
     * @param views 视图组件路径
     * @returns 格式化后的路由数据
     */
    function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): Route.recordMainRaw[] {
      return routes.map((route: any) => {
        switch (route.component) {
          case 'Layout':
            route.component = () => import('@/layouts/index.vue');
            break;
          default:
            if (route.component) {
              route.component = views[`../../views/${route.component}`];
            }
            else {
              delete route.component;
            }
        }
        if (route.children) {
          route.children = formatBackRoutes(route.children, views);
        }
        return route;
      });
    }

    /**
     * 生成后端路由
     */
    async function generateRoutesAtBack() {
      await GetApiRouteList().then(async (res: any) => {
        // 设置 routes 数据
        routesRaw.value = convertSingleRoutes(formatBackRoutes(res.data) as any);
        if (settingsStore.settings.app.enablePermission) {
          await userStore.getPermissions();
        }
        isGenerate.value = true;
        // 初始化常驻标签页
        if (settingsStore.settings.tabbar.enable) {
          tabbarStore.initPermanentTab();
        }
      }).catch(() => {});
    }

    /**
     * 生成文件系统路由
     * @param asyncRoutes 异步路由配置
     */
    async function generateRoutesAtFilesystem(asyncRoutes: RouteRecordRaw[]) {
      // 设置 routes 数据
      filesystemRoutesRaw.value = convertSingleRoutes(cloneDeep(asyncRoutes) as any);
      if (settingsStore.settings.app.enablePermission) {
        await userStore.getPermissions();
      }
      isGenerate.value = true;
      // 加载常驻标签页
      if (settingsStore.settings.tabbar.enable) {
        tabbarStore.initPermanentTab();
      }
    }

    /**
     * 设置当前要移除的路由。
     * @param {(() => void)[]} routes - 要设置的路由。
     */
    function setCurrentRemoveRoutes(routes: Array<{
      (): void
      system?: boolean
    }>) {
      currentRemoveRoutes.value = routes;
    }

    /**
     * 移除所有路由并重置相关变量。
     */
    function removeRoutes(isRefresh = false) {
      isGenerate.value = false;
      routesRaw.value = [];
      filesystemRoutesRaw.value = [];
      currentRemoveRoutes.value.forEach((removeRoute) => {
        if (!isRefresh) {
          removeRoute();
        }
      });
      currentRemoveRoutes.value = isRefresh ? currentRemoveRoutes.value.filter(fn => fn.system) : [];
    }

    return {
      isGenerate,
      routes,
      currentRemoveRoutes,
      flatRoutes,
      flatSystemRoutes,
      generateRoutesAtFront,
      generateRoutesAtBack,
      generateRoutesAtFilesystem,
      setCurrentRemoveRoutes,
      removeRoutes,
    };
  },
);

export default useRouteStore;
