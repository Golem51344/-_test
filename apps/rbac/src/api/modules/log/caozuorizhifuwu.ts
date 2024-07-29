import { basic as request } from '@/api/request';

/**
 * @description 操作日志详情
 * @url /log/operate/detailOperate
 * @method GET
 * @author @pubinfo/openapi
 */
export function getLogOperateDetailOperate<
  R = API.ResponseDataPubOperateLogDto,
  T = API.ResponseDataPubOperateLogDto,
>(params: API.getLogOperateDetailOperateParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/log/operate/detailOperate', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 操作日志分页查询
 * @url /log/operate/page
 * @method POST
 * @author @pubinfo/openapi
 */
export function postLogOperatePage<
  R = API.ResponseDataPageDataPubOperateLogDto,
  T = API.ResponseDataPageDataPubOperateLogDto,
>(body: API.PubOperateLogQuery, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/log/operate/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
