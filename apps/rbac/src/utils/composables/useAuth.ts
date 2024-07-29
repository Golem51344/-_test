import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';

/**
 * 处理身份验证和权限检查的自定义钩子。
 * @returns 包含 auth 和 authAll 函数的对象。
 */
export default function useAuth() {
  /**
   * 判断用户是否具有指定权限
   * @param permission 权限字符串
   * @returns 如果用户具有指定权限，则返回true；否则返回false
   */
  function hasPermission(permission: string) {
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    if (settingsStore.settings.app.enablePermission) {
      return userStore.permissions.includes(permission);
    }
    else {
      return true;
    }
  }

  /**
   * 检查用户是否具有所需的权限。
   * @param value - 要检查的权限，可以是单个权限或权限数组。
   * @returns 一个布尔值，指示用户是否具有所需的权限。
   */
  function auth(value: string | string[]) {
    let auth;
    if (typeof value === 'string') {
      auth = value !== '' ? hasPermission(value) : true;
    }
    else {
      auth = value.length > 0 ? value.some(item => hasPermission(item)) : true;
    }
    return auth;
  }

  /**
   * 检查用户是否具有所有指定的权限。
   * @param value - 权限字符串的数组。
   * @returns 如果用户具有所有指定的权限，则返回true；否则返回false。
   */
  function authAll(value: string[]) {
    return value.length > 0 ? value.every(item => hasPermission(item)) : true;
  }

  return {
    auth,
    authAll,
  };
}
