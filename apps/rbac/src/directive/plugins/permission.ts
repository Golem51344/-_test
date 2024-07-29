import type { App } from 'vue';

/**
 * 设置权限指令
 * @param app 应用程序实例
 */
export function setupPermissionDirective(app: App) {
  app.directive('auth', {
    mounted: (el, binding) => {
      if (!useAuth().auth(binding.value)) {
        el.remove();
      }
    },
  });

  app.directive('auth-all', {
    mounted: (el, binding) => {
      if (!useAuth().authAll(binding.value)) {
        el.remove();
      }
    },
  });
}
