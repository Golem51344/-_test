import { basic as request } from '@/api/request';

/**
 * @description 登录日志详情
 * @url /log/login/detailLogin
 * @method GET
 * @author @pubinfo/openapi
 */
export function getLogLoginDetailLogin<
  R = API.ResponseDataPubLoginLogDto,
  T = API.ResponseDataPubLoginLogDto,
>(params: API.getLogLoginDetailLoginParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/log/login/detailLogin', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 登录日志分页查询
 * @url /log/login/page
 * @method POST
 * @author @pubinfo/openapi
 */
export function postLogLoginPage<
  R = API.ResponseDataPageDataPubLoginLogDto,
  T = API.ResponseDataPageDataPubLoginLogDto,
>(body: API.PubLoginLogQuery, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/log/login/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
