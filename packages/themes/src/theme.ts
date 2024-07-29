/**
 * ========================================================================
 *                            system
 *=========================================================================
 */
import light from './system/light/light';
import classic from './system/light/classic';
import naive from './system/light/naive';
import barbie from './system/light/barbie';
import winter from './system/light/winter';
import cyberpunk from './system/light/cyberpunk';

import dark from './system/dark/dark';
import dracula from './system/dark/dracula';
import night from './system/dark/night';
import luxury from './system/dark/luxury';
import synthwave from './system/dark/synthwave';
import stone from './system/dark/stone';
import { mergeTheme } from './utils';

export const themes = mergeTheme([
  // --亮色主题--
  light,
  classic,
  naive,
  barbie,
  winter,
  cyberpunk,
  // --暗色主题--
  dark,
  dracula,
  night,
  luxury,
  synthwave,
  stone,
]);
