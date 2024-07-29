import { basic as request } from '@/api/request';

/**
 * @description 后端获取路由数据
 */
export function GetApiRouteList(options?: { [key: string]: any }) {
  return request.Get<API.RouteList>('app/route/list', {
    baseURL: '/mock',
    ...(options || {}),
  });
}

/**
 * @description 后端获取路由数据
 */
export function GetApiMenuList(options?: { [key: string]: any }) {
  return request.Get<API.MenuList>('/app/menu/list', {
    baseURL: '/mock',
    ...(options || {}),
  });
}
/**
 *
 * @returns IP验证
 */
export function GetAPIValidateIp() {
  return request.Post<SimplifyDeep<API.IsSuccess>>('/validateIp');
}
