import { basic as request } from '@/api/request';

/**
 * @description 删除数据 delete
 * @url /group/delete/${param0}
 * @method DELETE
 * @author @pubinfo/openapi
 */
export function deleteGroupDeleteById<R = API.ResponseData, T = API.ResponseData>(
  params: API.deleteGroupDeleteByIdParams,
  options?: Parameters<typeof request.Delete<R, T>>[2],
) {
  const { id: param0, ...queryParams } = params;
  return request.Delete<R, T>(
    `/group/delete/${param0}`,
    {},
    {
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/**
 * @description 根据主键获取群组和群组成员信息 detail
 * @url /group/detail/${param0}
 * @method GET
 * @author @pubinfo/openapi
 */
export function getGroupDetailById<R = API.ResponseDataPubGroupBo, T = API.ResponseDataPubGroupBo>(
  params: API.getGroupDetailByIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  const { id: param0, ...queryParams } = params;
  return request.Get<R, T>(`/group/detail/${param0}`, {
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/**
 * @description 分页查询 findPage
 * @url /group/findPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postGroupFindPage<
  R = API.ResponseDataPageDataPubGroup,
  T = API.ResponseDataPageDataPubGroup,
>(body: API.pubGroupDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/group/findPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 群组信息不分页查询 list
 * @url /group/list
 * @method POST
 * @author @pubinfo/openapi
 */
export function postGroupList<R = API.ResponseDataListPubGroup, T = API.ResponseDataListPubGroup>(
  body: API.PubGroupListDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/group/list', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 保存群组和成员信息 saveOrUpdate
 * @url /group/saveOrUpdate
 * @method POST
 * @author @pubinfo/openapi
 */
export function postGroupSaveOrUpdate<R = API.ResponseData, T = API.ResponseData>(
  body: API.PubGroupBo,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/group/saveOrUpdate', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
