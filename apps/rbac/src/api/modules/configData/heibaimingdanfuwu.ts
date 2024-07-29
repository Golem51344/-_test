import { basic as request } from '@/api/request';

/**
 * @description 新增黑白名单
 * @url /blackWhiteList/addBlackWhiteList
 * @method POST
 * @author @pubinfo/openapi
 */
export function postBlackWhiteListAddBlackWhiteList<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.BlackWhiteListAddDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/blackWhiteList/addBlackWhiteList', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 删除黑白名单
 * @url /blackWhiteList/delete/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getBlackWhiteListDeleteById<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(
  params: API.getBlackWhiteListDeleteByIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/blackWhiteList/delete/${param0}`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 查询黑白名单
 * @url /blackWhiteList/getBlackWhiteList/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getBlackWhiteListGetBlackWhiteListById<
  R = API.ResponseDataPubBlackWhiteList,
  T = API.ResponseDataPubBlackWhiteList,
>(
  params: API.getBlackWhiteListGetBlackWhiteListByIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/blackWhiteList/getBlackWhiteList/${param0}`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 分页查询查询黑白名单列表
 * @url /blackWhiteList/getBlackWhiteListPageList
 * @method POST
 * @author @pubinfo/openapi
 */
export function postBlackWhiteListGetBlackWhiteListPageList<
  R = API.ResponseDataIPagePubBlackWhiteList,
  T = API.ResponseDataIPagePubBlackWhiteList,
>(body: API.BlackWhiteListQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/blackWhiteList/getBlackWhiteListPageList', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 编辑黑白名单
 * @url /blackWhiteList/updateBlackWhiteList
 * @method POST
 * @author @pubinfo/openapi
 */
export function postBlackWhiteListUpdateBlackWhiteList<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.BlackWhiteListUpdateDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/blackWhiteList/updateBlackWhiteList', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
