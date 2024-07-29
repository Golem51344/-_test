import { basic as request } from '@/api/request';

/**
 * @description 区域新增
 * @url /region/addRegion
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRegionAddRegion<R = API.ResponseDataBoolean, T = API.ResponseDataBoolean>(
  body: API.PubRegionAddDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/region/addRegion', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 区域删除
 * @url /region/deleteRegion/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRegionDeleteRegionByCode<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(
  params: API.getRegionDeleteRegionByCodeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { code: param0, ...queryParams } = params;
  return request.Get<R, T>(`/region/deleteRegion/${param0}`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 根据parentId获取区域列表
 * @url /region/getListByParentId
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRegionGetListByParentId<
  R = API.ResponseDataListPubRegion,
  T = API.ResponseDataListPubRegion,
>(params: API.getRegionGetListByParentIdParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/region/getListByParentId', {
    params: {
      // parentId has a default value: 0
      parentId: '0',
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 根据code获取区域详情
 * @url /region/getRegionDetail/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRegionGetRegionDetailByCode<
  R = API.ResponseDataPubRegion,
  T = API.ResponseDataPubRegion,
>(
  params: API.getRegionGetRegionDetailByCodeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { code: param0, ...queryParams } = params;
  return request.Get<R, T>(`/region/getRegionDetail/${param0}`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 区域编辑
 * @url /region/updateRegion
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRegionUpdateRegion<R = API.ResponseDataBoolean, T = API.ResponseDataBoolean>(
  body: API.PubRegionAddDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/region/updateRegion', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
