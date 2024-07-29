import { basic as request } from '@/api/request';

/**
 * @description 切换登录组织
 * @url /auth/changeLoginOrg
 * @method POST
 * @author @pubinfo/openapi
 */
export function postAuthChangeLoginOrg<
  R = API.ResponseDataLoginTokenVo,
  T = API.ResponseDataLoginTokenVo,
>(params: API.postAuthChangeLoginOrgParams, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>(
    '/auth/changeLoginOrg',
    {},
    {
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/**
 * @description 密码登录
 * @url /auth/login
 * @method POST
 * @author @pubinfo/openapi
 */
export function postAuthLogin<R = API.ResponseDataLoginTokenVo, T = API.ResponseDataLoginTokenVo>(
  body: API.LoginByPwdDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/auth/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 获取登录公钥
 * @url /auth/login/key
 * @method GET
 * @author @pubinfo/openapi
 */
export function getAuthLoginKey<R = API.ResponseDataString, T = API.ResponseDataString>(
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/auth/login/key', {
    ...(options || {}),
  });
}

/**
 * @description 获取图片验证码
 * @url /auth/login/validCode
 * @method GET
 * @author @pubinfo/openapi
 */
export function getAuthLoginValidCode<
  R = API.ResponseDataValidCodeVo,
  T = API.ResponseDataValidCodeVo,
>(params: API.getAuthLoginValidCodeParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/auth/login/validCode', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 刷新访问令牌
 * @url /auth/token/refresh
 * @method POST
 * @author @pubinfo/openapi
 */
export function postAuthTokenRefresh<
  R = API.ResponseDataLoginTokenVo,
  T = API.ResponseDataLoginTokenVo,
>(params: API.postAuthTokenRefreshParams, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>(
    '/auth/token/refresh',
    {},
    {
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
