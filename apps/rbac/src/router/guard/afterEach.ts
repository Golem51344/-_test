import type { RouteLocationNormalized, Router } from 'vue-router';
import useSettingsStore from '@/store/modules/settings';
import useKeepAliveStore from '@/store/modules/keepAlive';
import useIframeStore from '@/store/modules/iframe';

export function afterNavigationGuard(router: Router, useCallBack?: (...arg: any) => void | Promise<void>) {
  function navigationGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const settingsStore = useSettingsStore();
    const keepAliveStore = useKeepAliveStore();
    const iframeStore = useIframeStore();

    if (typeof useCallBack === 'function') {
      useCallBack();
    }

    // 记录页面auth
    const auth = to.meta.auth;
    settingsStore.setAuth(auth || '');

    // 设置页面 title
    if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
      settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title);
    }
    else {
      settingsStore.setTitle(to.meta.title);
    }
    if (to.fullPath !== from.fullPath) {
      // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
      if (to.meta.cache && !to.meta.iframe) {
        const RawRouteComponent = to.matched.at(-1)?.components?.default;
        const componentName = RawRouteComponent?.name;
        if (componentName) {
          keepAliveStore.add(componentName);
        }
        else {
          useError(`路径 ${to.path} 对应的 SFC组件未设置组件名，会导致缓存失效(虽然 vue@3.2.34 之后会默认使用文件名,但是文件名判重的概率较大，故不采用)`);
        }
      }
      // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
      if (from.meta.cache && !from.meta.iframe) {
        const componentName = from.matched.at(-1)?.components?.default.name;
        if (componentName) {
        // 通过 meta.cache 判断针对哪些页面进行缓存
          switch (typeof from.meta.cache) {
            case 'string':
              if (from.meta.cache !== to.name) {
                keepAliveStore.remove(componentName);
              }
              break;
            case 'object':
              if (!from.meta.cache.includes(to.name as string)) {
                keepAliveStore.remove(componentName);
              }
              break;
          }
          // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
          if (from.meta.noCache) {
            switch (typeof from.meta.noCache) {
              case 'string':
                if (from.meta.noCache === to.name) {
                  keepAliveStore.remove(componentName);
                }
                break;
              case 'object':
                if (from.meta.noCache.includes(to.name as string)) {
                  keepAliveStore.remove(componentName);
                }
                break;
            }
          }
          // 如果进入的是 reload 页面，则也将离开页面的缓存清空
          if (to.name === 'reload') {
            keepAliveStore.remove(componentName);
          }
        }
      }

      if (to.meta.iframe) {
        iframeStore.open(to.fullPath);
      }
      if (from.meta.iframe) {
        if (from.meta.cache) {
          switch (typeof from.meta.cache) {
            case 'string':
              if (from.meta.cache !== to.name) {
                iframeStore.close(from.fullPath);
              }
              break;
            case 'object':
              if (!from.meta.cache.includes(to.name as string)) {
                iframeStore.close(from.fullPath);
              }
              break;
          }
          if (from.meta.noCache) {
            switch (typeof from.meta.noCache) {
              case 'string':
                if (from.meta.noCache === to.name) {
                  iframeStore.close(from.fullPath);
                }
                break;
              case 'object':
                if (from.meta.noCache.includes(to.name as string)) {
                  iframeStore.close(from.fullPath);
                }
                break;
            }
          }
          if (to.name === 'reload') {
            iframeStore.close(from.fullPath);
          }
        }
        else {
          iframeStore.close(from.fullPath);
        }
      }
    }
  }
  router.afterEach(navigationGuard);
}
