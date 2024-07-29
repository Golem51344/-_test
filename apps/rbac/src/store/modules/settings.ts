import { cloneDeep, defaultsDeep, get, set } from 'lodash-es';
import type { RouteLocationNormalized, RouteMeta } from 'vue-router';
import { usePreferredDark } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Modal } from 'ant-design-vue';
import { FrownOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { STORE_NAME } from '@/store/enum';
import settingsDefault from '@/settings';
import { objectToPaths } from '@/utils/index';
import useUserStore from '@/store/modules/user';
import storage from '@/utils/storage';
import { useWarn } from '@/composables/log/index';

const useSettingsStore = defineStore(
  // 唯一ID
  STORE_NAME.SETTINGS,
  () => {
    const settings = ref(settingsDefault);

    const userSettings = ref<Settings.all>({});
    const globalSettings = ref(settingsDefault);

    const globaleSettingsIsActive = ref(false);

    const userStore = useUserStore();

    /**
     * 对于有全局系统配置的管理员，在个人设置设置优先的原则下
     * 应当在全局系统配置变更时提示用户是否恢复个人设置为系统默认设置
     */
    watchDiffObject(globalSettings, (diff: Record<string, any>) => {
      if (!globaleSettingsIsActive.value) {
        return;
      }
      const globalChangeSettingPath = objectToPaths(diff);
      const userSettingsPath = objectToPaths(userSettings.value);
      if (userSettingsPath.includes(globalChangeSettingPath.at(0)!)) {
        if (storage.session.has('userSettingIsGod')) {
          return;
        }
        Modal.confirm({
          title: '系统设置提示',
          icon: createVNode(FrownOutlined),
          content: '当前设置被个人设置覆盖无法预览当前全局系统配置，是否需要恢复个人设置为系统默认设置',
          okText: '重置个人配置',
          cancelText: '不在提示',
          onOk() {
            userStore.resetSettings();
          },
          onCancel() {
            storage.session.set('userSettingIsGod', '');
          },
        });
      }
      else {
        const val = get(diff, globalChangeSettingPath.at(0)!);
        set(settings.value, globalChangeSettingPath.at(0)!, val);
      }
    },
    {
      flush: 'post',
    });

    watch([
      () => settings.value.app.colorScheme,
      () => settings.value.app.lightTheme,
      () => settings.value.app.darkTheme,
    ], ([colorScheme, lightTheme, darkTheme]) => {
      if (colorScheme === '') {
        colorScheme = usePreferredDark() ? 'dark' : 'light';
      }
      switch (colorScheme) {
        case 'light':
          document.documentElement.classList.remove('dark');
          document.body.setAttribute('data-theme', lightTheme);
          break;
        case 'dark':
          document.documentElement.classList.add('dark');
          document.body.setAttribute('data-theme', darkTheme);
          break;
      }
    },
    {
      immediate: true,
    });

    watch(() => settings.value.layout.widthMode,
      (val) => {
        document.body.setAttribute('data-app-width-mode', val);
      }, {
        immediate: true,
      },
    );

    watch(() => settings.value.menu.menuMode,
      (val) => {
        document.body.setAttribute('data-menu-mode', val);
      },
      {
        immediate: true,
      },
    );

    // 操作系统
    const os = ref<'mac' | 'windows' | 'linux' | 'other'>('other');
    const agent = navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.includes('mac os'):
        os.value = 'mac';
        break;
      case agent.includes('windows'):
        os.value = 'windows';
        break;
      case agent.includes('linux'):
        os.value = 'linux';
        break;
    }

    // 页面权限码
    const auth = ref<RouteMeta['auth']>();

    // 记录页面标题
    function setAuth(_auth: RouteMeta['auth']) {
      if (Array.isArray(_auth)) {
        _DEV_ && useWarn('在使用数据范围的时候,router auth字段不能为数组');
        auth.value = _auth[0] || '';
      }
      else {
        auth.value = _auth;
      }
    }

    // 页面标题
    const title = ref<RouteMeta['title']>();

    // 记录页面标题
    function setTitle(_title: RouteMeta['title']) {
      title.value = _title;
    }

    // 自定义标题
    const customTitleList = ref<{
      fullPath: RouteLocationNormalized['fullPath']
      title: string
    }[]>([]);

    // 设置自定义标题
    function setCustomTitle(fullPath: RouteLocationNormalized['fullPath'], title: string) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath);
      if (index > -1) {
        customTitleList.value[index].title = title;
      }
      else {
        customTitleList.value.push({
          fullPath,
          title,
        });
      }
    }

    // 重置自定义标题
    function resetCustomTitle(fullPath: RouteLocationNormalized['fullPath']) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath);
      if (index > -1) {
        customTitleList.value.splice(index, 1);
      }
    }

    // 显示模式
    const mode = ref<'pc' | 'mobile'>('pc');

    // 设置显示模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile';
        }
        else {
          // 如果是桌面设备，则根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 992 ? 'mobile' : 'pc';
        }
      }
      else {
        mode.value = 'pc';
      }
    }

    // 次导航是否收起（用于记录 pc 模式下最后的状态）
    const subMenuCollapseLastStatus = ref(settingsDefault.menu.subMenuCollapse);
    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse;
      if (mode.value === 'pc') {
        subMenuCollapseLastStatus.value = !subMenuCollapseLastStatus.value;
      }
    }

    watch(mode, (val) => {
      switch (val) {
        case 'pc':
          settings.value.menu.subMenuCollapse = subMenuCollapseLastStatus.value;
          break;
        case 'mobile':
          settings.value.menu.subMenuCollapse = true;
          break;
      }
      document.body.setAttribute('data-mode', val);
    }, {
      immediate: true,
    });

    // 设置默认语言
    function setDefaultLang(lang: string) {
      settings.value.app.defaultLang = lang;
    }

    // 设置主题颜色模式
    function setColorScheme(color: Required<Settings.app>['colorScheme']) {
      settings.value.app.colorScheme = color;
    }

    // 主页面是否最大化
    const mainPageMaximizeStatus = ref(false);

    // 切换当前主页面最大化
    function setMainPageMaximize(value?: boolean) {
      mainPageMaximizeStatus.value = value ?? !mainPageMaximizeStatus.value;
    }

    /**
     * 更新配置
     * @param data - 配置数据
     * @param fromBase - 是否从基础配置中更新
     */
    function updateSettings(data: Settings.all, fromBase = false) {
      settings.value = defaultsDeep(data, fromBase ? settingsDefault : settings.value);
    }

    /**
     * 更新系统全局配置
     * @param data - 全局配置
     */
    function updateGlobalSettings(data: Settings.all) {
      globalSettings.value = defaultsDeep(data, settingsDefault);
    }

    /**
     * 更新用户配置
     * @param data - 用户配置
     */
    function updateUserSettings(data: Settings.all) {
      if (Object.keys(data).length > 0) {
        userSettings.value = defaultsDeep(data, cloneDeep(userSettings.value));
      }
      else {
        userSettings.value = {};
      }
    }

    /**
     * 开始监听globaleSettings变化
     */
    function setGlobaleSettingsFlag(flag = true) {
      globaleSettingsIsActive.value = flag;
    }

    return {
      settings,
      os,
      auth,
      setAuth,
      title,
      setTitle,
      customTitleList,
      setCustomTitle,
      resetCustomTitle,
      mode,
      setMode,
      subMenuCollapseLastStatus,
      toggleSidebarCollapse,
      setDefaultLang,
      setColorScheme,
      mainPageMaximizeStatus,
      setMainPageMaximize,
      updateSettings,
      globalSettings,
      updateGlobalSettings,
      userSettings,
      updateUserSettings,
      setGlobaleSettingsFlag,
    };
  },
);

export default useSettingsStore;
