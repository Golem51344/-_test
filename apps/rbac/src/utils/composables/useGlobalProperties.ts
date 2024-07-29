import type { ComponentInternalInstance } from 'vue';

/**
 * 获取全局属性的自定义钩子函数
 * @returns 全局属性对象
 */
export default function useGlobalProperties() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  return appContext.config.globalProperties;
}
