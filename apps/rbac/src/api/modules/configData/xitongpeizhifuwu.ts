import { basic as request } from '@/api/request';

/**
 * @description 新增用户样式配置
 * @url /sysconfig/addOrEditUserThemeStyleConfig
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrEditUserThemeStyleConfig<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.AddOrEditStyleConfigDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/sysconfig/addOrEditUserThemeStyleConfig', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 新增系统样式配置
 * @url /sysconfig/addOrEidtSysThemeStyleConfig
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrEidtSysThemeStyleConfig<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.AddOrEditStyleConfigDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/sysconfig/addOrEidtSysThemeStyleConfig', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 新增或修改背景图片-大图
 * @url /sysconfig/addOrUpdateBackgroundImage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrUpdateBackgroundImage<
  R = API.ResponseDataString,
  T = API.ResponseDataString,
>(
  params: API.postSysconfigAddOrUpdateBackgroundImageParams,
  body: Record<string, unknown>,
  file?: File,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (Array.isArray(item)) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request.Post<R, T>('/sysconfig/addOrUpdateBackgroundImage', formData, {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 新增或修改背景图片-小图
 * @url /sysconfig/addOrUpdateBackgroundSmallImage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrUpdateBackgroundSmallImage<
  R = API.ResponseDataString,
  T = API.ResponseDataString,
>(
  params: API.postSysconfigAddOrUpdateBackgroundSmallImageParams,
  body: Record<string, unknown>,
  file?: File,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (Array.isArray(item)) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request.Post<R, T>('/sysconfig/addOrUpdateBackgroundSmallImage', formData, {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 新增或修改log图片
 * @url /sysconfig/addOrUpdateLogImage
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrUpdateLogImage<
  R = API.ResponseDataString,
  T = API.ResponseDataString,
>(body: Record<string, unknown>, file?: File, options?: Parameters<typeof request.Post<R, T>>[2]) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (Array.isArray(item)) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request.Post<R, T>('/sysconfig/addOrUpdateLogImage', formData, {
    ...(options || {}),
  });
}

/**
 * @description 新增或修改登录页配置项
 * @url /sysconfig/addOrUpdateLoginConfigurationItem
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigAddOrUpdateLoginConfigurationItem<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(body: API.AddOrUpdateConfigurationItemDTO, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/sysconfig/addOrUpdateLoginConfigurationItem', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 通过code下载文件（返回流）
 * @url /sysconfig/downLoadImageStreamByCode
 * @method GET
 * @author @pubinfo/openapi
 */
export function getSysconfigDownLoadImageStreamByCode<R = any, T = any>(
  params: API.getSysconfigDownLoadImageStreamByCodeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/sysconfig/downLoadImageStreamByCode', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 编辑系统安全配置
 * @url /sysconfig/editSysSecurityConfig
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigEditSysSecurityConfig<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(body: API.EditSysSecurityConfigDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/sysconfig/editSysSecurityConfig', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 获取登录页配置项
 * @url /sysconfig/getLoginConfigurationItem
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigGetLoginConfigurationItem<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>(
    '/sysconfig/getLoginConfigurationItem',
    {},
    {
      ...(options || {}),
    },
  );
}

/**
 * @description 获取系统安全配置
 * @url /sysconfig/getSysSecurityConfig
 * @method GET
 * @author @pubinfo/openapi
 */
export function getSysconfigGetSysSecurityConfig<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/sysconfig/getSysSecurityConfig', {
    ...(options || {}),
  });
}

/**
 * @description 获取系统样式配置
 * @url /sysconfig/getSysThemeStyleConfig
 * @method GET
 * @author @pubinfo/openapi
 */
export function getSysconfigGetSysThemeStyleConfig<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/sysconfig/getSysThemeStyleConfig', {
    ...(options || {}),
  });
}

/**
 * @description 获取样式配置
 * @url /sysconfig/getThemeStyleConfig
 * @method GET
 * @author @pubinfo/openapi
 */
export function getSysconfigGetThemeStyleConfig<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/sysconfig/getThemeStyleConfig', {
    ...(options || {}),
  });
}

/**
 * @description 获取用户样式配置
 * @url /sysconfig/getUserThemeStyleConfig
 * @method GET
 * @author @pubinfo/openapi
 */
export function getSysconfigGetUserThemeStyleConfig<
  R = API.ResponseDataPubSysConfig,
  T = API.ResponseDataPubSysConfig,
>(options?: Parameters<typeof request.Get<R, T>>[1]) {
  return request.Get<R, T>('/sysconfig/getUserThemeStyleConfig', {
    ...(options || {}),
  });
}

/**
 * @description 重置用户样式配置
 * @url /sysconfig/resetUserThemeStyleConfig
 * @method POST
 * @author @pubinfo/openapi
 */
export function postSysconfigResetUserThemeStyleConfig<
  R = API.ResponseDataBoolean,
  T = API.ResponseDataBoolean,
>(options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>(
    '/sysconfig/resetUserThemeStyleConfig',
    {},
    {
      ...(options || {}),
    },
  );
}
