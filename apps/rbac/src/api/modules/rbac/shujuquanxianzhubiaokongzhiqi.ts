import { basic as request } from '@/api/request';

/**
 * @description 数据权限不分页下拉列表
 * @url /rbac/pubDataPermissions/dataPermissionList
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacPubDataPermissionsDataPermissionList<
  R = API.ResponseDataListshujuquanxianshituduixiang,
  T = API.ResponseDataListshujuquanxianshituduixiang,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/pubDataPermissions/dataPermissionList', {
    ...(options || {}),
  });
}

/**
 * @description 删除数据权限 根据ID删除PubDataPermissions
 * @url /rbac/pubDataPermissions/delete
 * @method DELETE
 * @author @pubinfo/openapi
 */
export function deleteRbacPubDataPermissionsDelete<
  R = API.ResponseDataVoid,
  T = API.ResponseDataVoid,
>(
  params: API.deleteRbacPubDataPermissionsDeleteParams,
  options?: Parameters<typeof request.Delete<R, T>>[2],
) {
  return request.Delete<R, T>(
    '/rbac/pubDataPermissions/delete',
    {},
    {
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/**
 * @description 根据ID获取数据权限详情 返回指定ID的数据权限主表
 * @url /rbac/pubDataPermissions/getById
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacPubDataPermissionsGetById<
  R = API.ResponseDatashujuquanxianbianjiduixiang,
  T = API.ResponseDatashujuquanxianbianjiduixiang,
>(
  params: API.getRbacPubDataPermissionsGetByIdParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/pubDataPermissions/getById', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 获取用户各组织数据权限
 * @url /rbac/pubDataPermissions/getUserOrgDataPermissionList
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsGetUserOrgDataPermissionList<
  R = API.ResponseDatashouquanshujuquanxianduixiang,
  T = API.ResponseDatashouquanshujuquanxianduixiang,
>(
  params: API.postRbacPubDataPermissionsGetUserOrgDataPermissionListParams,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>(
    '/rbac/pubDataPermissions/getUserOrgDataPermissionList',
    {},
    {
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/**
 * @description 授权数据权限
 * @url /rbac/pubDataPermissions/grantDataPermission
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsGrantDataPermission<
  R = API.ResponseDataVoid,
  T = API.ResponseDataVoid,
>(
  body: API.xinzengshouquanshujuquanxianduixiang,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/pubDataPermissions/grantDataPermission', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 编辑角色和授权数据权限
 * @url /rbac/pubDataPermissions/grantUserRoleAndDatPermission
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsGrantUserRoleAndDatPermission<
  R = API.ResponseDataVoid,
  T = API.ResponseDataVoid,
>(
  body: API.bianjijiaoseheshouquanshujuquanxianduixiang[],
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/pubDataPermissions/grantUserRoleAndDatPermission', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 分页查询数据权限 返回数据权限主表分页
 * @url /rbac/pubDataPermissions/pageQuery
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsPageQuery<
  R = API.ResponseDataPageDatashujuquanxianshituduixiang,
  T = API.ResponseDataPageDatashujuquanxianshituduixiang,
>(body: API.shujuquanxianchaxunduixiang, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/pubDataPermissions/pageQuery', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 创建数据权限 根据请求体创建一个新的数据权限主表
 * @url /rbac/pubDataPermissions/save
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsSave<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  body: API.shujuquanxianxinzenghuogengxinduixiang,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/pubDataPermissions/save', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 更新数据权限 根据ID更新PubDataPermissions的详细信息
 * @url /rbac/pubDataPermissions/update
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacPubDataPermissionsUpdate<
  R = API.ResponseDataPubDataPermissions,
  T = API.ResponseDataPubDataPermissions,
>(
  body: API.shujuquanxianxinzenghuogengxinduixiang,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/pubDataPermissions/update', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
