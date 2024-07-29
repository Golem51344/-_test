import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import type { AxiosResponse } from 'axios';
import { createServerTokenAuthentication } from '@alova/scene-vue';
import type { RequestResult } from '#/Request';
import { RESPONSE_CODE } from '@/api/enum/code';
import useUserStore from '@/store/modules/user';
import { ReSetTokenAndRefreshToken, createErrorMsg, expired, maybeSetAuthData, maybeSetLanguage, maybeSetToken, refreshToken } from '@/api/helper';

/**
 *
 * @description
 * 创建 API 请求的基础 URL。
 * 如果环境是开发环境，并且 VITE_OPEN_PROXY 标志设置为 'true'，
 * 则返回 '/proxy/'。否则，返回 VITE_APP_API_BASEURL 的值。
 * @returns API 请求的基础 URL。
 */
export function createBaseURL(baseUrl: string) {
  let requestBaseUrl;
  if (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') {
    const url = new URL(baseUrl);
    const pathname = url.pathname;
    requestBaseUrl = `${pathname}/proxy/`;
  }
  else {
    requestBaseUrl = baseUrl;
  }
  return requestBaseUrl;
}

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
  typeof VueHook,
  typeof axiosRequestAdapter
  >({
    /**
     * @description
     * 给权限接口添加Authorization
     */
    assignToken: (method) => {
      maybeSetToken(method);
      maybeSetAuthData(method);
    },
    /**
     * @description
     * 鉴权处理
     */
    refreshTokenOnSuccess: {
      /**
       * @description
       * 检测token是否过期
       * @returns 是否token过期
       */
      isExpired: (response: AxiosResponse<RequestResult>) => {
        const code = response.data.code;
        return expired(code);
      },
      /**
       * @description
       * 当token过期时触发，在此函数中触发刷新token
       */
      handler: async () => {
        const res = await refreshToken();
        const { accessToken, refreshToken: refreshTokenData } = res.data as Required<API.LoginTokenVo>;
        ReSetTokenAndRefreshToken(accessToken, refreshTokenData);
      },
    },
  });

const timeout = 60 * 1000;
export function createRequest(baseUrl: string) {
  const alovaInstance = createAlova({
    statesHook: VueHook,
    requestAdapter: axiosRequestAdapter(),
    baseURL: createBaseURL(baseUrl),
    timeout,
    localCache: null,

    /**
     * @description 请求拦截
     */
    beforeRequest: onAuthRequired(async (method) => {
      maybeSetLanguage(method);
    }),

    /**
     * @description 响应拦截
     */
    responded: onResponseRefreshToken({

      /**
       * @description
       * 网络成功的响应
       */
      async onSuccess(response: AxiosResponse<RequestResult>) {
        const isBlob = response.config?.responseType === 'blob';
        if (isBlob) {
          return Promise.resolve(response);
        }

        const data = response.data;
        // 基于code判断逻辑
        const { code } = data;
        // code 都是number类型
        switch (code) {
        /**
         * @description
         * 成功的code
         */
          case RESPONSE_CODE.SUCCESS:
            return Promise.resolve(data);

            /**
             * @description
             * 用于判断refreshToken是否过期
             * 如果refreshToken也过期了,需要重新登录
             * 不需要msg提示信息
             */
          case RESPONSE_CODE.LOGIN_TOKEN_INVALID:
            await useUserStore().logout();
            return Promise.reject(data);
            /**
             * @description
             * 账户未启用,请联系管理员
             * 账户锁定,请联系管理员
             */
          case RESPONSE_CODE.ACCOUT_NOT_ENABLE:
          case RESPONSE_CODE.ACCOUNT_LOCKED:
            createErrorMsg(response.data.msg);
            await useUserStore().logout();
            return Promise.reject(data);

            /**
             * @description
             * 密码过期或者首次登录,需要修改密码
             * 需要跳转到修改密码页面
             * 目前貌似不需要单独判读code在此处处理
             */
          case RESPONSE_CODE.CHANGE_INIT_PASSWORD:
          case RESPONSE_CODE.PASSWORD_EXPIRED:
            return Promise.reject(data);

            /**
             * @description
             * RESPONSE_CODE 中其他的错误信息
             */
          default:
            createErrorMsg(response.data.msg);
            return Promise.reject(data);
        }
      },
      /**
       * @description
       * 网络失败的响应
       */
      onError(error) {
        const message = error.message;
        let msg = '';
        switch (message) {
          case 'Network Error':
            msg = '网络故障';
            break;
          case `timeout of ${timeout}ms exceeded`:
            msg = '接口请求超时';
            break;
          default:
            msg = `接口${message.substr(message.length - 3)}异常`;
            break;
        }
        createErrorMsg(msg);
        return Promise.reject(error);
      },
    }),
  });

  return alovaInstance;
}
