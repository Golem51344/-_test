import { hex2rgba } from '@unocss/preset-mini/utils';

type CSSColorValue = string;
type manColor =
  | 'bg'
  | 'container-bg'
  | 'border-color';

type headerColor =
  | 'header-bg'
  | 'header-color'
  | 'header-menu-color'
  | 'header-menu-hover-bg'
  | 'header-menu-hover-color'
  | 'header-menu-active-bg'
  | 'header-menu-active-color';

type mainSidebarColor =
  | 'main-sidebar-bg'
  | 'main-sidebar-menu-color'
  | 'main-sidebar-menu-hover-bg'
  | 'main-sidebar-menu-hover-color'
  | 'main-sidebar-menu-active-bg'
  | 'main-sidebar-menu-active-color';

type subSidebarColor =
  | 'sub-sidebar-bg'
  | 'sub-sidebar-logo-bg'
  | 'sub-sidebar-logo-color'
  | 'sub-sidebar-menu-color'
  | 'sub-sidebar-menu-hover-bg'
  | 'sub-sidebar-menu-hover-color'
  | 'sub-sidebar-menu-active-bg'
  | 'sub-sidebar-menu-active-color';

type tabbarColor =
  | 'tabbar-dividers-bg'
  | 'tabbar-tab-color'
  | 'tabbar-tab-hover-bg'
  | 'tabbar-tab-hover-color'
  | 'tabbar-tab-active-color';

type themeScheme = 'light' | 'dark';
type customColor = typeof customColorKey[number];
type benchmark = `--g-${manColor | headerColor | mainSidebarColor | subSidebarColor | tabbarColor}`;
export type cssVarKey = customColor | benchmark;

export type colorScheme = Record<cssVarKey, CSSColorValue> & { 'color-scheme': themeScheme } & { label?: string };

export interface themeOptions {
  name: string
  colors: colorScheme
}

export const customColorKey = ['--ui-primary', '--ui-text'] as const;

export interface globalTheme {
  [key: string]: colorScheme
}

export function mergeTheme(themes: globalTheme[]): globalTheme {
  const themeColor = Object.assign({}, ...themes);
  return themeColor;
}

function normalizeColor(colors: colorScheme) {
  for (const key of customColorKey) {
    const colorValue = colors[key];
    colors[key] = hex2rgba(colorValue)!.join(' ');
  }
  return colors;
}
export function defineTheme(theme: themeOptions): globalTheme {
  const { name, colors } = theme;
  const colorScheme: globalTheme = Object.create(null);
  colorScheme[name] = normalizeColor(colors);
  return colorScheme;
}
