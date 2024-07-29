import { basic as request } from '@/api/request';

/**
 * @description 新增
 * @url /rbac/org/addOrg
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacOrgAddOrg<R = API.ResponseDataPubOrg, T = API.ResponseDataPubOrg>(
  body: API.PubOrgAddDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/org/addOrg', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 删除
 * @url /rbac/org/deleteOrg
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacOrgDeleteOrg<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.getRbacOrgDeleteOrgParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/org/deleteOrg', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 根据id查询
 * @url /rbac/org/info
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacOrgInfo<R = API.ResponseDataPubOrg, T = API.ResponseDataPubOrg>(
  params: API.getRbacOrgInfoParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/org/info', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 组织列表查询通过父id 顶级id:0
 * @url /rbac/org/orgListByParentId
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacOrgOrgListByParentId<
  R = API.ResponseDataListPubOrg,
  T = API.ResponseDataListPubOrg,
>(
  params: API.getRbacOrgOrgListByParentIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/org/orgListByParentId', {
    params: {
      // parentId has a default value: 0
      parentId: '0',

      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 搜索接口
 * @url /rbac/org/search
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacOrgSearch<
  R = API.ResponseDataPageDataPubOrg,
  T = API.ResponseDataPageDataPubOrg,
>(body: API.OrgSearchQuery, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/org/search', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 组织id数组搜索组织信息接口
 * @url /rbac/org/searchOrgByIds
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacOrgSearchOrgByIds<
  R = API.ResponseDataListPubOrg,
  T = API.ResponseDataListPubOrg,
>(body: string[], options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/org/searchOrgByIds', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 搜索子节点平铺 顶级id:0
 * @url /rbac/org/searchSubOrgById
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacOrgSearchSubOrgById<
  R = API.ResponseDataListPubOrg,
  T = API.ResponseDataListPubOrg,
>(params: API.getRbacOrgSearchSubOrgByIdParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/org/searchSubOrgById', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 搜索后的树形结构
 * @url /rbac/org/searchTreeById
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacOrgSearchTreeById<
  R = API.ResponseDataPubOrgTreeBo,
  T = API.ResponseDataPubOrgTreeBo,
>(params: API.getRbacOrgSearchTreeByIdParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/org/searchTreeById', {
    params: {
      // id has a default value: 0
      id: '0',
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 修改
 * @url /rbac/org/updateOrg
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacOrgUpdateOrg<R = API.ResponseDataPubOrg, T = API.ResponseDataPubOrg>(
  body: API.PubOrgUpdateDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/org/updateOrg', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
