/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-11-24 19:23:27
 * @LastEditors: wsy
 */
import banner from 'vite-plugin-banner';
import dayjs from 'dayjs';

const deploymentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
export default function createBanner() {
  return banner(`
/**
 * 由 社会治理事业部 提供技术支持
 * Powered by wsy-admin
 * ${deploymentTime}
 */
`);
}
