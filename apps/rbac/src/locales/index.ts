import { cloneDeep } from 'lodash-es';
import { createI18n as _createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import type { App } from 'vue';
import { en, zhCN, zhTW } from '@/locales/ui';
import useSettingsStore from '@/store/modules/settings';

function createI18n() {
  const settingsStore = useSettingsStore();
  // 如果没设置默认语言，则根据当前浏览器语言设置默认语言
  if (!settingsStore.settings.app.defaultLang) {
    const lang = navigator.language.toLowerCase();
    for (const key in messages) {
      lang.includes(key) && settingsStore.setDefaultLang(key);
    }
  }
  const locale = settingsStore.settings.app.defaultLang;
  const i18n = _createI18n({
    legacy: false,
    locale,
    flatJson: true,
    fallbackLocale: 'zh-cn',
    messages,
    globalInjection: true,
  });
  return i18n;
}

function getLocales() {
  return cloneDeep(messages);
}

function getUILocales() {
  const locales: {
    [key: string]: any
  } = {};
  for (const key in messages) {
    locales[key] = {};
    switch (key) {
      case 'zh-cn':
        Object.assign(locales[key], { labelName: '中文(简体)' }, { ui: zhCN });
        break;
      case 'zh-tw':
        Object.assign(locales[key], { labelName: '中文(繁體)' }, { ui: zhTW });
        break;
      case 'en':
        Object.assign(locales[key], { labelName: 'English' }, { ui: en });
        break;
    }
  }
  return locales;
}

// 用于路由 meta.i18n 配置，方便在 VSCode I18n Ally 插件进行显示，无实际作用
function $t(key: string) {
  return key;
}

function setupI18n(app: App) {
  const i18n = createI18n();
  app.use(i18n);
  return app;
}

export {
  setupI18n,
  getLocales,
  getUILocales,
  $t,
};
