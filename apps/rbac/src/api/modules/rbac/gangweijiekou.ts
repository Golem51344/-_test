import { basic as request } from '@/api/request';

/**
 * @description 删除 delete
 * @url /rbac/post/delete/${param0}
 * @method DELETE
 * @author @pubinfo/openapi
 */
export function deleteRbacPostDeleteById<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.deleteRbacPostDeleteByIdParams,
  options?: Parameters<typeof request.Delete<R, T>>[2],
) {
  const { id: param0, ...queryParams } = params;
  return request.Delete<R, T>(
    `/rbac/post/delete/${param0}`,
    {},
    {
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/**
 * @description 根据主键获取信息 detail
 * @url /rbac/post/detail/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacPostDetailById<R = API.ResponseDataPubPost, T = API.ResponseDataPubPost>(
  params: API.getRbacPostDetailByIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/rbac/post/detail/${param0}`, {
    params: { ...queryParams },
    ...(options || {}),
  });
}

/**
 * @description 分页查询 findPage
 * @url /rbac/post/findPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPostFindPage<
  R = API.ResponseDataPageDataPubPost,
  T = API.ResponseDataPageDataPubPost,
>(body: API.PubPostQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/post/findPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 全量岗位列表查询 list
 * @url /rbac/post/list
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacPostList<R = API.ResponseDataListPubPost, T = API.ResponseDataListPubPost>(
  params: API.getRbacPostListParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/post/list', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 新增岗位 save
 * @url /rbac/post/save
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPostSave<R = API.ResponseDataString, T = API.ResponseDataString>(
  body: API.PubPostDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/post/save', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
