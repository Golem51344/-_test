import { basic as request } from '@/api/request';

/**
 * @description 资源新增
 * @url /rbac/resource/addResource
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacResourceAddResource<
  R = API.ResponseDataPubResource,
  T = API.ResponseDataPubResource,
>(body: API.PubResourceAddDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/resource/addResource', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 应用列表
 * @url /rbac/resource/appList
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceAppList<
  R = API.ResponseDataListPubResource,
  T = API.ResponseDataListPubResource,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/resource/appList', {
    ...(options || {}),
  });
}

/**
 * @description 资源绑定的角色列表
 * @url /rbac/resource/getRoleListByResourceId
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceGetRoleListByResourceId<
  R = API.ResponseDataListPubRoleBo,
  T = API.ResponseDataListPubRoleBo,
>(
  params: API.getRbacResourceGetRoleListByResourceIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/resource/getRoleListByResourceId', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 授权资源列表
 * @url /rbac/resource/grantedResources
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceGrantedResources<
  R = API.ResponseDataListString,
  T = API.ResponseDataListString,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/resource/grantedResources', {
    ...(options || {}),
  });
}

/**
 * @description 选择应用下的资源树
 * @url /rbac/resource/groupResourceTree
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceGroupResourceTree<
  R = API.ResponseDataListPubResourceTreeBo,
  T = API.ResponseDataListPubResourceTreeBo,
>(
  params: API.getRbacResourceGroupResourceTreeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/resource/groupResourceTree', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 根据id查询
 * @url /rbac/resource/info
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceInfo<
  R = API.ResponseDataPubResource,
  T = API.ResponseDataPubResource,
>(params: API.getRbacResourceInfoParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/resource/info', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 登录后菜单树加载
 * @url /rbac/resource/menuTree
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacResourceMenuTree<
  R = API.ResponseDataListPubResourceTreeBo,
  T = API.ResponseDataListPubResourceTreeBo,
>(options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>(
    '/rbac/resource/menuTree',
    {},
    {
      ...(options || {}),
    },
  );
}

/**
 * @description 资源删除
 * @url /rbac/resource/resourceDelete
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceResourceDelete<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.getRbacResourceResourceDeleteParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/resource/resourceDelete', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 资源列表通过父id查询
 * @url /rbac/resource/resourceListByParentId
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceResourceListByParentId<
  R = API.ResponseDataListPubResource,
  T = API.ResponseDataListPubResource,
>(
  params: API.getRbacResourceResourceListByParentIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/resource/resourceListByParentId', {
    params: {
      // parentId has a default value: 0
      parentId: '0',
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 全量树
 * @url /rbac/resource/resourceTree
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacResourceResourceTree<
  R = API.ResponseDataListPubResourceTreeBo,
  T = API.ResponseDataListPubResourceTreeBo,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/resource/resourceTree', {
    ...(options || {}),
  });
}

/**
 * @description 资源编辑
 * @url /rbac/resource/resourceUpdate
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacResourceResourceUpdate<
  R = API.ResponseDataPubResource,
  T = API.ResponseDataPubResource,
>(body: API.PubResourceUpdateDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/resource/resourceUpdate', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
