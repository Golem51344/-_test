import { basic as request } from '@/api/request';

/**
 * @description 根据主键获取用户最近常用表详情 根据主键获取用户最近常用表详情
 * @url /rbac/used/${param0}/detail
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacUsedByIdDetail<
  R = API.ResponseDataPubUserUsed,
  T = API.ResponseDataPubUserUsed,
>(params: API.getRbacUsedByIdDetailParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/rbac/used/${param0}/detail`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 添加用户最近常用表数据 添加用户最近常用表数据
 * @url /rbac/used/add
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUsedAdd<R = API.ResponseData, T = API.ResponseData>(
  body: API.AddPubUserUsedDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/used/add', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 批量添加用户最近常用表数据 批量添加用户最近常用表数据
 * @url /rbac/used/addBatch
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUsedAddBatch<R = API.ResponseData, T = API.ResponseData>(
  body: API.AddPubUserUsedDto[],
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/used/addBatch', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 分页查询用户最近常用表 分页查询用户最近常用表
 * @url /rbac/used/findPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUsedFindPage<
  R = API.ResponseDataPageDataPubUserUsed,
  T = API.ResponseDataPageDataPubUserUsed,
>(body: API.PubUserUsedDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/used/findPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
