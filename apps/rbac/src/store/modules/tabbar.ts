import { cloneDeep } from 'lodash-es';
import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import useSettingsStore from './settings';
import useUserStore from './user';
import useRouteStore from './route';
import useKeepAliveStore from './keepAlive';
import useIframeStore from './iframe';
import { STORE_NAME } from '@/store/enum';
import storage from '@/utils/storage';
import type { Tabbar } from '#/tabbar';
import { getTabbarMemoryKey } from '@/store/helper';

// TODO: 移除createTab函数，返回值变化太多
const useTabbarStore = defineStore(
  STORE_NAME.TABBAR,
  () => {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    const keepAliveStore = useKeepAliveStore();
    const iframeStore = useIframeStore();

    const list = ref<Tabbar.recordRaw[]>([]);
    const leaveIndex = ref(-1);

    /**
     * 初始化永久标签页。
     */
    function initPermanentTab() {
      const tabs: Tabbar.recordRaw[] = [];
      routeStore.flatSystemRoutes.forEach((items) => {
        items.children && items.children.forEach((route) => {
          if (route.meta?.permanent && route.meta?.breadcrumbNeste) {
            const fullPath = route.meta.breadcrumbNeste.at(-1)?.path as string;
            const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (route.meta.activeMenu || fullPath) : fullPath;
            tabs.push({
              tabId,
              fullPath,
              routeName: route.name,
              activeMenu: route.meta.activeMenu,
              title: typeof route.meta.title === 'function' ? route.meta.title() : route.meta.title,
              i18n: route.meta.i18n,
              iframe: route.meta.iframe,
              icon: route.meta?.icon ?? route.meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
              activeIcon: route.meta?.activeIcon ?? route.meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon,
              name: route.name ? [route.name as string] : [],
              customTitleList: [],
              isPin: false,
              isPermanent: true,
            });
          }
        });
      });
      routeStore.flatRoutes.forEach((items) => {
        if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
          items.children && items.children.forEach((route) => {
            if (route.meta?.permanent && route.meta?.breadcrumbNeste) {
              const fullPath = route.meta.breadcrumbNeste.at(-1)?.path as string;
              const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (route.meta.activeMenu || fullPath) : fullPath;
              tabs.push({
                tabId,
                fullPath,
                routeName: route.name,
                activeMenu: route.meta.activeMenu,
                title: typeof route.meta.title === 'function' ? route.meta.title() : route.meta.title,
                i18n: route.meta.i18n,
                iframe: route.meta.iframe,
                icon: route.meta?.icon ?? route.meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
                activeIcon: route.meta?.activeIcon ?? route.meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon,
                name: route.name ? [route.name as string] : [],
                customTitleList: [],
                isPin: false,
                isPermanent: true,
              });
            }
          });
        }
        else {
          if (items.meta?.permanent) {
            const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (items.meta.activeMenu || items.path) : items.path;
            tabs.push({
              tabId,
              fullPath: items.path,
              routeName: items.name,
              activeMenu: items.meta.activeMenu,
              title: typeof items.meta.title === 'function' ? items.meta.title() : items.meta.title,
              i18n: items.meta.i18n,
              iframe: items.meta.iframe,
              icon: items.meta?.icon ?? items.meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
              activeIcon: items.meta?.activeIcon ?? items.meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon,
              name: items.name ? [items.name as string] : [],
              customTitleList: [],
              isPin: false,
              isPermanent: true,
            });
          }
        }
      });
      // 常驻的标签页添加到标签栏开头
      tabs.length && list.value.unshift(...tabs);
    }

    /**
     * 添加标签页
     * @param route 路由对象
     */
    async function add(route: RouteLocationNormalized) {
      const names: string[] = [];
      route.matched.forEach((v, i) => {
        if (i > 0) {
          v.components?.default.name && names.push(v.components.default.name);
        }
      });
      const meta = route.matched.at(-1)?.meta;
      const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (meta?.activeMenu ?? route.fullPath) : route.fullPath;

      if (route.name !== 'reload') {
        // 记录查找到的标签页
        const findTab = list.value.find((item) => {
          if (settingsStore.settings.tabbar.mergeTabsBy === 'routeName' && item.routeName) {
            return item.routeName === route.name;
          }
          else {
            return item.tabId === tabId;
          }
        });
        // 新增标签页
        if (!findTab) {
          const listItem = {
            tabId,
            fullPath: route.fullPath,
            routeName: route.name!,
            activeMenu: meta?.activeMenu,
            title: typeof meta?.title === 'function' ? meta.title() : meta?.title,
            i18n: meta?.i18n,
            iframe: meta?.iframe,
            icon: meta?.icon ?? meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
            activeIcon: meta?.activeIcon ?? meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon,
            name: names,
            customTitleList: [],
            isPin: false,
            isPermanent: false,
          };
          if (leaveIndex.value >= 0) {
            list.value.splice(leaveIndex.value + 1, 0, listItem);
            leaveIndex.value = -1;
          }
          else {
            list.value.push(listItem);
          }
        }
        // 更新标签页
        else {
          if (settingsStore.settings.tabbar.mergeTabsBy !== '') {
            findTab.tabId = tabId;
            findTab.fullPath = route.fullPath;
            findTab.routeName = route.name!;
            findTab.activeMenu = meta?.activeMenu;
            findTab.title = typeof meta?.title === 'function' ? meta.title() : meta?.title;
            findTab.i18n = meta?.i18n;
            findTab.iframe = meta?.iframe;
            findTab.icon = meta?.icon ?? meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon;
            findTab.activeIcon = meta?.activeIcon ?? meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon;
          }
        }
      }
      updateStorage();
    }

    /**
     * 从选项卡栏中移除一个选项卡。
     * @param tabId 要移除的选项卡的ID。
     */
    function remove(tabId: Tabbar.recordRaw['tabId']) {
      const keepName: string[] = [];
      const removeName: string[] = [];
      const removeIframe: string[] = [];
      list.value.forEach((v) => {
        if (v.tabId === tabId) {
          !v.iframe ? removeName.push(...v.name) : removeIframe.push(v.tabId);
        }
        else {
          keepName.push(...v.name);
        }
      });
      const name: string[] = [];
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v);
        }
      });
      // 如果是手动点击关闭 tab 标签页，则删除页面缓存
      keepAliveStore.remove(name);
      iframeStore.close(removeIframe);
      list.value = list.value.filter((item) => {
        return item.tabId !== tabId;
      });
      updateStorage();
    }

    /**
     * 从选项卡栏中移除除指定选项卡以外的所有选项卡。
     * @param tabId 要保留的选项卡的ID。
     */
    function removeOtherSide(tabId: Tabbar.recordRaw['tabId']) {
      const keepName: string[] = [];
      const removeName: string[] = [];
      const removeIframe: string[] = [];
      list.value.forEach((v) => {
        if (v.tabId !== tabId && !v.isPermanent && !v.isPin) {
          !v.iframe ? removeName.push(...v.name) : removeIframe.push(v.tabId);
        }
        else {
          keepName.push(...v.name);
        }
      });
      const name: string[] = [];
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v);
        }
      });
      keepAliveStore.remove(name);
      iframeStore.close(removeIframe);
      list.value = list.value.filter((item) => {
        return item.tabId === tabId || item.isPermanent || item.isPin;
      });
      updateStorage();
    }

    /**
     * 从标签页列表中移除指定路由左侧的标签页。
     * @param tabId 要移除的标签页的ID
     */
    function removeLeftSide(tabId: Tabbar.recordRaw['tabId']) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId);
      const keepName: string[] = [];
      const removeName: string[] = [];
      const removeIframe: string[] = [];
      list.value.forEach((v, i) => {
        if (i < index && !v.isPermanent && !v.isPin) {
          !v.iframe ? removeName.push(...v.name) : removeIframe.push(v.tabId);
        }
        else {
          keepName.push(...v.name);
        }
      });
      const name: string[] = [];
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v);
        }
      });
      keepAliveStore.remove(name);
      iframeStore.close(removeIframe);
      list.value = list.value.filter((item, i) => {
        return i >= index || item.isPermanent || item.isPin;
      });
      updateStorage();
    }

    /**
     * 从指定路由开始，移除右侧的标签页，并执行相应的操作。
     * @param tabId 要移除的标签页的唯一标识符
     */
    function removeRightSide(tabId: Tabbar.recordRaw['tabId']) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId);
      const keepName: string[] = [];
      const removeName: string[] = [];
      const removeIframe: string[] = [];
      list.value.forEach((v, i) => {
        if (i > index && !v.isPermanent && !v.isPin) {
          !v.iframe ? removeName.push(...v.name) : removeIframe.push(v.tabId);
        }
        else {
          keepName.push(...v.name);
        }
      });
      const name: string[] = [];
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v);
        }
      });
      keepAliveStore.remove(name);
      iframeStore.close(removeIframe);
      list.value = list.value.filter((item, i) => {
        return i <= index || item.isPermanent || item.isPin;
      });
      updateStorage();
    }

    /**
     * 将指定的标签固定在标签栏中。
     * @param tabId 要固定的标签的唯一标识符
     */
    function pin(tabId: Tabbar.recordRaw['tabId']) {
      const index = list.value.findIndex(item => item.tabId === tabId);
      let toIndex = -1;
      list.value.forEach((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index;
        }
      });
      if (index > toIndex) {
        list.value.splice(toIndex + 1, 0, list.value[index]);
        list.value.splice(index + 1, 1);
      }
      // 修改状态
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          item.isPin = true;
        }
      });
      updateStorage();
    }

    /**
     * 取消固定指定的选项卡。
     * 将选项卡移动到最后一个固定选项卡之后的下一个可用位置。
     * 更新选项卡的 isPin 属性为 false。
     * 操作完成后更新存储。
     *
     * @param tabId - 要取消固定的选项卡的唯一标识符。
     */
    function unPin(tabId: Tabbar.recordRaw['tabId']) {
      const index = list.value.findIndex(item => item.tabId === tabId);
      let toIndex = -1;
      list.value.forEach((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index;
        }
      });
      list.value.splice(toIndex + 1, 0, list.value[index]);
      list.value.splice(index, 1);
      // 修改状态
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          item.isPin = false;
        }
      });
      updateStorage();
    }

    /**
     * 清空列表
     */
    function clean() {
      list.value = [];
    }

    /**
     * 将列表中的元素通过将元素从旧索引移动到新索引来进行排序。
     * @param newIndex - 应该将元素移动到的新索引。
     * @param oldIndex - 应该移动的元素的旧索引。
     */
    function sort(newIndex: number, oldIndex: number) {
      list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0]);
      updateStorage();
    }

    /**
     * 设置自定义标题
     * @param {object} options - 选项参数
     * @param {string} options.tabId - 标签页ID
     * @param {string} options.title - 标题
     */
    function setCustomTitle({ tabId, title }: {
      tabId: Tabbar.recordRaw['tabId']
      title: string
    }) {
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          const findItem = item.customTitleList.find(v => v.fullPath === item.fullPath);
          if (findItem) {
            findItem.title = title;
          }
          else {
            item.customTitleList.push({
              fullPath: item.fullPath,
              title,
            });
          }
        }
      });
      updateStorage();
    }

    /**
     * 重置自定义标题
     * @param tabId - 标签栏ID
     */
    function resetCustomTitle(tabId: Tabbar.recordRaw['tabId']) {
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          const index = item.customTitleList.findIndex(v => v.fullPath === item.fullPath);
          if (index > -1) {
            item.customTitleList.splice(index, 1);
          }
        }
      });
      updateStorage();
    }

    /**
     * 更新存储
     */
    async function updateStorage() {
      if (settingsStore.settings.tabbar.storageTo === 'local') {
        const tabbarMemoryKey = getTabbarMemoryKey();
        const pinData = storage.local.has(tabbarMemoryKey) ? JSON.parse(storage.local.get(tabbarMemoryKey) as string) : {};
        pinData[userStore.account] = cloneDeep(list.value.filter((item) => {
          return item.isPin;
        })).map((item) => {
          // 不存储自定义标题
          item.customTitleList = [];
          return item;
        });
        storage.local.set(tabbarMemoryKey, JSON.stringify(pinData));
      }
      else if (settingsStore.settings.tabbar.storageTo === 'server') {
        await GetAPITabbarEdit(JSON.stringify(cloneDeep(list.value.filter((item) => {
          return item.isPin;
        })).map((item) => {
          // 不存储自定义标题
          item.customTitleList = [];
          return item;
        })));
      }
      if (settingsStore.settings.tabbar.enableMemory) {
        // 将非固定和非常驻标签页记录到 sessionStorage
        const tabbarMemoryKey = getTabbarMemoryKey();
        const unpinData = storage.session.has(tabbarMemoryKey) ? JSON.parse(storage.session.get(tabbarMemoryKey) as string) : {};
        unpinData[userStore.account] = cloneDeep(list.value.filter((item) => {
          return !item.isPin && !item.isPermanent;
        })).map((item) => {
          // 不存储自定义标题
          item.customTitleList = [];
          return item;
        });
        storage.session.set(tabbarMemoryKey, JSON.stringify(unpinData));
      }
    }

    /**
     * 从存储中恢复标签栏数据
     */
    async function recoveryStorage() {
      const tabbarMemoryKey = getTabbarMemoryKey();
      if (settingsStore.settings.tabbar.storageTo === 'local') {
        if (storage.local.has(tabbarMemoryKey)) {
          list.value.push(...(JSON.parse(storage.local.get(tabbarMemoryKey) as string)[userStore.account] || []));
        }
      }
      else if (settingsStore.settings.tabbar.storageTo === 'server') {
        const res = await GetAPITabbar();
        list.value.push(...(JSON.parse(res.data.tabbar || '[]')));
      }
      if (settingsStore.settings.tabbar.enableMemory && storage.session.has(tabbarMemoryKey)) {
        list.value.push(...(JSON.parse(storage.session.get(tabbarMemoryKey) as string)[userStore.account] || []));
      }
    }

    return {
      list,
      leaveIndex,
      initPermanentTab,
      add,
      remove,
      removeOtherSide,
      removeLeftSide,
      removeRightSide,
      pin,
      unPin,
      clean,
      sort,
      setCustomTitle,
      resetCustomTitle,
      recoveryStorage,
    };
  },
);

export default useTabbarStore;
