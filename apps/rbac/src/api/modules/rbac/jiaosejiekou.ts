import { basic as request } from '@/api/request';

/**
 * @description 角色新增
 * @url /rbac/role/addRole
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacRoleAddRole<R = API.ResponseDataPubRoleBo, T = API.ResponseDataPubRoleBo>(
  body: API.PubRoleAddDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/role/addRole', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 根据id查询
 * @url /rbac/role/info
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacRoleInfo<
  R = API.ResponseDataPubRoleResourceBo,
  T = API.ResponseDataPubRoleResourceBo,
>(params: API.getRbacRoleInfoParams, options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/role/info', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 角色删除
 * @url /rbac/role/roleDelete
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacRoleRoleDelete<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.getRbacRoleRoleDeleteParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/role/roleDelete', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 角色不分页查询
 * @url /rbac/role/roleList
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacRoleRoleList<
  R = API.ResponseDataListPubRole,
  T = API.ResponseDataListPubRole,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/role/roleList', {
    ...(options || {}),
  });
}

/**
 * @description 角色分页查询
 * @url /rbac/role/rolePage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacRoleRolePage<
  R = API.ResponseDataPageDataPubRoleBo,
  T = API.ResponseDataPageDataPubRoleBo,
>(body: API.PubRoleQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/role/rolePage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 角色编辑
 * @url /rbac/role/roleUpdate
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacRoleRoleUpdate<
  R = API.ResponseDataPubRoleBo,
  T = API.ResponseDataPubRoleBo,
>(body: API.PubRoleUpdateDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/role/roleUpdate', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
