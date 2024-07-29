import { basic as request } from '@/api/request';

/**
 * @description 修改登录密码
 * @url /rbac/user/changePassword
 * @method PUT
 * @author @pubinfo/openapi
 */
export function putRbacUserChangePassword<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.putRbacUserChangePasswordParams,
  options?: Parameters<typeof request.Put<R, T>>[2],
) {
  return request.Put<R, T>(
    '/rbac/user/changePassword',
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
 * @description 编辑角色和授权数据权限
 * @url /rbac/user/grantUserRoleAndDatPermission
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserGrantUserRoleAndDatPermission<
  R = API.ResponseDataVoid,
  T = API.ResponseDataVoid,
>(
  body: API.bianjijiaoseheshouquanshujuquanxianduixiang[],
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/user/grantUserRoleAndDatPermission', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 根据id查询
 * @url /rbac/user/info
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacUserInfo<R = API.ResponseDataPubUserBo, T = API.ResponseDataPubUserBo>(
  params: API.getRbacUserInfoParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/user/info', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 用户新增
 * @url /rbac/user/pubUserAdd
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserPubUserAdd<R = API.ResponseDataString, T = API.ResponseDataString>(
  body: API.PubUserAddDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/user/pubUserAdd', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 重置登录密码
 * @url /rbac/user/resetPassword
 * @method PUT
 * @author @pubinfo/openapi
 */
export function putRbacUserResetPassword<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.putRbacUserResetPasswordParams,
  options?: Parameters<typeof request.Put<R, T>>[2],
) {
  return request.Put<R, T>(
    '/rbac/user/resetPassword',
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
 * @description 用户id和组织id查询详情
 * @url /rbac/user/userAndOrgList
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserUserAndOrgList<
  R = API.ResponseDataListPubUserDto,
  T = API.ResponseDataListPubUserDto,
>(body: API.PubUserAndOrgQueryDto[], options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/user/userAndOrgList', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 用户删除
 * @url /rbac/user/userDelete
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacUserUserDelete<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  params: API.getRbacUserUserDeleteParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/rbac/user/userDelete', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 登录用户完整信息
 * @url /rbac/user/userEntireInfo
 * @method GET
 * @author @pubinfo/openapi
 */
export function getRbacUserUserEntireInfo<
  R = API.ResponseDataPubUserBo,
  T = API.ResponseDataPubUserBo,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/rbac/user/userEntireInfo', {
    ...(options || {}),
  });
}

/**
 * @description 用户和组织信息分页查询
 * @url /rbac/user/userForMultiOrgPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserUserForMultiOrgPage<
  R = API.ResponseDataPageDataPubUserOrgBo,
  T = API.ResponseDataPageDataPubUserOrgBo,
>(body: API.PubUserSplitOrgQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/user/userForMultiOrgPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 用户分页查询
 * @url /rbac/user/userPage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserUserPage<
  R = API.ResponseDataPageDataPubUserBo,
  T = API.ResponseDataPageDataPubUserBo,
>(body: API.PubUserQueryDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/rbac/user/userPage', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 用户编辑
 * @url /rbac/user/userUpdate
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserUserUpdate<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  body: API.PubUserUpdateDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/user/userUpdate', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 用户编辑(详情和组织等)-2024年6月24日
 * @url /rbac/user/userUpdate-v2
 * @method POST
 * @author @pubinfo/openapi
 */
export function postRbacUserUserUpdateV2<R = API.ResponseDataVoid, T = API.ResponseDataVoid>(
  body: API.PubUserUpdateDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/rbac/user/userUpdate-v2', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
