import { definePreset, entriesToCss, toArray } from '@unocss/core';
import { themes } from './theme';

type colorScheme = 'light' | 'dark';

const suffix = [['', ' *', '::before', '::after'], ['::backdrop']];

function createCssVar(key: colorScheme, themeName: string) {
  function createSuffixScheme(preSuffix: string, suffixMap = suffix) {
    return suffixMap.reduce<string[]>((acc, suffix) => acc.concat(suffix.map(s => `${preSuffix}${s}`).join(',')), []);
  }
  const map = {
    light(key: string) {
      const preSuffix = `[data-theme="${key}"]`;
      return createSuffixScheme(preSuffix);
    },
    dark(key: string) {
      const preSuffix = `html.dark [data-theme="${key}"]`;
      return createSuffixScheme(preSuffix);
    },
  };
  return map[key](themeName);
}

function normalizePreflights() {
  return {
    getCSS: () => {
      const injectionCss: string[] = [];
      Object.keys(themes).forEach((key) => {
        delete themes[key].label;
        const css = entriesToCss(Object.entries(themes[key]));
        const themeColorScheme = themes[key]['color-scheme'] as colorScheme;
        const roots = toArray(
          createCssVar(themeColorScheme, key),
        );
        injectionCss.push(roots.map(root => `${root}{${css}}`).join(''));
      });
      return injectionCss.join('');
    },
  };
}

export const presetThemes = definePreset(() => {
  return {
    name: '@wsys/preset-themes',
    preflights: [
      normalizePreflights(),
    ],
  };
});

export default presetThemes;
