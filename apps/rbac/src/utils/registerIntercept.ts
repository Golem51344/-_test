import type { App } from 'vue';
import { GetAPIValidateIp } from '@/api/system/app';

/**
 * 拦截黑白名单
 */
export async function validateIp() {
  await GetAPIValidateIp();
}

/**
 * 注册拦截器
 */
export async function registerIntercept(_app: App<Element>) {
  await validateIp();
}
