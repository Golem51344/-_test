import { basic as request } from '@/api/request';

/**
 * @description 登录
 */
export function PostAPILogins(data: SimplifyDeep<API.LoginData>, options?: { [key: string]: any }) {
  return request.Post<SimplifyDeep<API.AccountInfo>>('/user/login',
    data,
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description 获取权限
 */
export function GetAPIPermission(options?: { [key: string]: any }) {
  return request.Get<SimplifyDeep<API.Permission>>('/user/permission',
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description 获取偏好设置
 */
export function GetAPIPreferences(options?: { [key: string]: any }) {
  return request.Get<SimplifyDeep<API.Preferences>>('/user/preferences',
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 *
 * @description 修改偏好设置
 */
export function GetAPIPreferencesEdit(data: string, options?: { [key: string]: any }) {
  return request.Post<SimplifyDeep<API.IsSuccess>>('/user/preferences/edit',
    data,
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description 修改密码
 */
export function GetAPIPasswordEdit(data: API.PasswordEditBody, options?: { [key: string]: any }) {
  return request.Post<SimplifyDeep<API.IsSuccess>>('/user/preferences/edit',
    data,
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description 获取标签栏固定标签页数据
 */
export function GetAPITabbar(options?: { [key: string]: any }) {
  return request.Get<SimplifyDeep<API.Tabbar>>('/user/tabbar',
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description 修改标签栏固定标签页数据
 */
export function GetAPITabbarEdit(data: string, options?: { [key: string]: any }) {
  return request.Post<SimplifyDeep<API.IsSuccess>>('/user/tabbar/edit',
    data,
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description
 */
export function GetAPIFavorites(options?: { [key: string]: any }) {
  return request.Get<SimplifyDeep<API.Favorites>>('/user/favorites',
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}

/**
 * @description
 */
export function GetAPIFavoritesEdit(data: string, options?: { [key: string]: any }) {
  return request.Post<SimplifyDeep<API.IsSuccess>>('/user/tabbar/edit',
    data,
    {
      baseURL: '/mock',
      ...(options || {}),
    });
}
