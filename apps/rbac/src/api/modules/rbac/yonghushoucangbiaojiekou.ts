import { basic as request } from '@/api/request';

/**
 * @description 删除用户收藏表数据 删除用户收藏表数据
 * @url /rbac/collect/${param0}/delete
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacCollectByIdDelete<R = API.ResponseData, T = API.ResponseData>(
  params: API.postRbacCollectByIdDeleteParams,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  const { id: param0, ...queryParams } = params;
  return request.Post<R, T>(
    `/rbac/collect/${param0}/delete`,
    {},
    {
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/**
 * @description 根据主键获取用户收藏表详情 根据主键获取用户收藏表详情
 * @url /rbac/collect/${param0}/detail
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacCollectByIdDetail<
  R = API.ResponseDataPubUserCollect,
  T = API.ResponseDataPubUserCollect,
>(params: API.getRbacCollectByIdDetailParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/rbac/collect/${param0}/detail`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 添加用户收藏表数据 添加用户收藏表数据
 * @url /rbac/collect/add
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacCollectAdd<R = API.ResponseDataBoolean, T = API.ResponseDataBoolean>(
  body: API.AddPubUserCollectDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/collect/add', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 分页查询用户收藏表 分页查询用户收藏表
 * @url /rbac/collect/findPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacCollectFindPage<
  R = API.ResponseDataPageDataPubUserCollect,
  T = API.ResponseDataPageDataPubUserCollect,
>(body: API.PubUserCollectDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/collect/findPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 取消用户收藏表数据 取消用户收藏表数据
 * @url /rbac/collect/removeCollect
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacCollectRemoveCollect<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.AddPubUserCollectDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/collect/removeCollect', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
