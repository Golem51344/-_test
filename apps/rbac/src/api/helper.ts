import type { Method } from 'alova';
import type { AlovaAxiosRequestConfig } from '@alova/adapter-axios';
import type { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { message } from 'ant-design-vue';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import { getRefreshToken, getToken } from '@/utils/user';
import { RESPONSE_CODE } from '@/api/enum/code';

type RequestMethod = Method<
  Ref,
  Ref,
  any,
  any,
  AlovaAxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders
>;

/**
 * 创建错误消息并使用 `message.error` 函数显示。
 * @param msg - 要显示的错误消息。
 */
export function createErrorMsg(msg: string) {
  message.error(msg);
}

/**
 * 创建信息提示消息
 * @param msg 消息内容
 */
export function createInfoMsg(msg: string) {
  message.info(msg);
}

/**
 * 根据用户登录状态，可能设置请求头中的令牌。
 * @param method 请求方法对象
 */
export function maybeSetToken(method: RequestMethod) {
  const userStore = useUserStore();
  if (userStore.isLogin) {
    method.config.headers.Authorization = getToken();
  }
}

/**
 * 根据请求方法设置语言。
 * @param method 请求方法
 */
export function maybeSetLanguage(method: RequestMethod) {
  const settingsStore = useSettingsStore();
  method.config.headers['Accept-Language'] = settingsStore.settings.app.defaultLang;
}

/**
 * 数据权限标识
 * @param method 请求方法
 */
export function maybeSetAuthData(method: RequestMethod) {
  const settingsStore = useSettingsStore();
  method.config.headers['X-ResourceMark'] = method.config.headers['X-ResourceMark'] || settingsStore.auth;
}

/**
 * 刷新令牌
 * @returns {object} 刷新令牌的方法
 */
export function refreshToken() {
  const refreshToken = getRefreshToken();
  const method = postAuthTokenRefresh({ refreshToken });
  method.meta = {
    authRole: 'refreshToken',
  };
  return method;
}

/**
 * 检查提供的代码是否表示过期的访问令牌。
 * @param code - 要检查的代码。
 */
export function expired(code: number) {
  return code === RESPONSE_CODE.ACCESS_TOKEN_INVALID;
}

/**
 * 设置访问令牌和刷新令牌到本地存储和用户存储中。
 * @param accessToken - 要设置的访问令牌。
 * @param refreshTokenData - 要设置的刷新令牌数据。
 */
export function ReSetTokenAndRefreshToken(accessToken: string, refreshTokenData: string) {
  const userStore = useUserStore();
  userStore.token = accessToken;
  userStore.refreshToken = refreshTokenData;
}
