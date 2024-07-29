import type { RouteRecordNormalized } from 'vue-router';
import { isFunction, isString } from 'lodash-es';
import { defineStore } from 'pinia';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import { STORE_NAME } from '@/store/enum/index';
import type { Iframe } from '#/iframe';

/**
 * useIframeStore 是一个自定义的 Vue 组合函数，提供了用于管理 store 中 iframe 的响应式状态和方法。
 * 它返回一个包含以下属性和方法的对象：
 * - isGenerate: 一个 ref，表示 iframe 列表是否已生成。
 * - openedList: 一个计算属性，返回当前打开的 iframe 的过滤列表。
 * - generateList: 一个根据提供的路由配置生成 iframe 列表的方法。
 * - closeLoading: 一个关闭特定 iframe 的加载状态的方法。
 * - open: 一个打开特定 iframe 并更新最近路径列表的方法。
 * - close: 一个关闭一个或多个 iframe 并从最近路径列表中移除它们的方法。
 */
const useIframeStore = defineStore(
  STORE_NAME.IFRAME,
  () => {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();

    const isGenerate = ref(false);
    const list = ref<Iframe.recordRaw[]>([]);
    const recentPathList = ref<Iframe.recordRaw['path'][]>([]);
    const openedList = computed(() => list.value.filter(item => item.isOpen));

    /**
     * 生成列表
     * @param router 路由记录数组
     */
    async function generateList(router: RouteRecordNormalized[]) {
      for (const routeRecord of router) {
        if (routeRecord.meta.iframe && !routeRecord.meta.link) {
          if (isFunction(routeRecord.meta.iframe)) {
            routeRecord.meta.iframe = await routeRecord.meta.iframe(toRaw(userStore.user));
          }
          list.value.push({
            path: routeRecord.path,
            src: routeRecord.meta.iframe,
            isOpen: false,
            isLoading: true,
          });
        }
      }

      isGenerate.value = true;
    }

    /**
     * 关闭指定路径的iframe加载状态。
     * @param path - iframe的路径。
     */
    function closeLoading(path: string) {
      const index = list.value.findIndex(item => item.path === path);
      list.value[index].isLoading = !~index;
    }

    /**
     * 打开指定路径的 iframe
     * @param path 要打开的路径
     */
    function open(path: string) {
      const item = list.value.find(item => item.path === path);
      if (item) {
        item.isOpen = true;
        const idx = recentPathList.value.findIndex(item => item === path);
        if (~idx) {
          recentPathList.value.splice(0, 0, recentPathList.value[idx]);
          recentPathList.value.splice(idx);
        }
        else {
          recentPathList.value.unshift(path);
        }
      }
      // 最大缓存数量检测，超过缓存数量则关闭最早打开的 iframe
      let count = 0;
      recentPathList.value.forEach((item) => {
        if (list.value.find(v => v.path === item)?.isOpen) {
          count++;
        }
        if (count > settingsStore.settings.mainPage.iframeCacheMax) {
          const idx = list.value.findIndex(v => v.path === item);
          if (~idx) {
            list.value[idx].isOpen = false;
            list.value[idx].isLoading = true;
          }
        }
      });
    }

    /**
     * 关闭指定路径的 iframe 路由。
     * 如果路径是一个字符串，则关闭单个 iframe 路由。
     * 如果路径是一个字符串数组，则关闭多个 iframe 路由。
     * @param path 要关闭的 iframe 路由的路径（路径）。
     */
    function close(path: string | string[]) {
      function closeIframeRoute(path: string | string[]) {
        const idx = list.value.findIndex(item => item.path === path);
        if (~idx) {
          list.value[idx].isOpen = false;
          list.value[idx].isLoading = true;
        }
        recentPathList.value = recentPathList.value.filter(item => item !== path);
      }

      if (isString(path)) {
        closeIframeRoute(path);
      }
      else {
        path.forEach(closeIframeRoute);
      }
    }

    return {
      isGenerate,
      openedList,
      generateList,
      closeLoading,
      open,
      close,
    };
  },
);

export default useIframeStore;
