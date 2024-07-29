import { basic as request } from '@/api/request';

/**
 * @description 字典项删除
 * @url /dict/item/delete/${param0}
 * @method DELETE
 * @author @pubinfo/openapi
 */
export function deleteDictItemDeleteById<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.deleteDictItemDeleteByIdParams,
  options?: Parameters<typeof request.Delete<R, T>>[2],
) {
  const { id: param0, ...queryParams } = params;
  return request.Delete<R, T>(
    `/dict/item/delete/${param0}`,
    {},
    {
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/**
 * @description 字典项列表
 * @url /dict/item/list
 * @method GET
 * @author @pubinfo/openapi
 */
export function getDictItemList<
  R = API.ResponseDataListDictItemVo,
  T = API.ResponseDataListDictItemVo,
>(params: API.getDictItemListParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/dict/item/list', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 字典项列表(批量返回)
 * @url /dict/item/list/batch
 * @method GET
 * @author @pubinfo/openapi
 */
export function getDictItemListBatch<
  R = API.ResponseDataListDictItemBatchVo,
  T = API.ResponseDataListDictItemBatchVo,
>(params: API.getDictItemListBatchParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/dict/item/list/batch', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 字典项分页查询
 * @url /dict/item/page
 * @method POST
 * @author @pubinfo/openapi
 */
export function postDictItemPage<
  R = API.ResponseDataPageDataDictItemVo,
  T = API.ResponseDataPageDataDictItemVo,
>(body: API.DictItemQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/dict/item/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 字典项保存
 * @url /dict/item/save
 * @method POST
 * @author @pubinfo/openapi
 */
export function postDictItemSave<R = API.ResponseDataString, T = API.ResponseDataString>(
  body: API.DictItemSaveDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/dict/item/save', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 字典类型删除
 * @url /dict/type/delete/${param0}
 * @method DELETE
 * @author @pubinfo/openapi
 */
export function deleteDictTypeDeleteById<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.deleteDictTypeDeleteByIdParams,
  options?: Parameters<typeof request.Delete<R, T>>[2],
) {
  const { id: param0, ...queryParams } = params;
  return request.Delete<R, T>(
    `/dict/type/delete/${param0}`,
    {},
    {
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/**
 * @description 字典类型分页查询
 * @url /dict/type/page
 * @method POST
 * @author @pubinfo/openapi
 */
export function postDictTypePage<
  R = API.ResponseDataPageDataDictTypeVo,
  T = API.ResponseDataPageDataDictTypeVo,
>(body: API.DictTypeQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/dict/type/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 字典类型保存
 * @url /dict/type/save
 * @method POST
 * @author @pubinfo/openapi
 */
export function postDictTypeSave<R = API.ResponseDataString, T = API.ResponseDataString>(
  body: API.DictTypeSaveDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/dict/type/save', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
