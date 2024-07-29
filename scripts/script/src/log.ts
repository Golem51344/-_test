/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-22 21:36:46
 * @LastEditTime: 2023-11-23 16:15:33
 * @LastEditors: wsy
 */
import fonts from 'cfonts';

export function bootstrop() {
  printLoGo('PUBINFO');
  function printLoGo(logo) {
    fonts.say(logo, {
      font: 'simple3d',
      align: 'left',
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: 0,
      spaceless: false,
      gradient: ['blue', 'magenta'],
      independentGradient: false,
      transitionGradient: false,
      env: 'node',
    });
  }
}
