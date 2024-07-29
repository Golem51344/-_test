import type { ComponentInfo, ComponentResolver } from 'unplugin-vue-components/types';

/**
 * 根据提供的组件名称解析组件。
 *
 * @param componentName - 要解析的组件名称。
 * @returns 解析后的组件信息，如果组件名称不符合预期的模式，则返回 undefined。
 */
function resolveComponent(componentName: string): ComponentInfo | undefined {
  if (!componentName.match(/^Pub[A-Z]/)) {
    return;
  }
  return {
    name: componentName,
    as: componentName,
    from: '@pubinfo/components',
  };
}

/**
 * 根据指令名称解析指令。
 * @param directiveName - 指令的名称。
 * @returns 如果指令名称与模式匹配，则返回组件信息，否则返回 undefined。
 */
function resolveDirective(directiveName: string): ComponentInfo | undefined {
  if (!directiveName.match(/^Pub[A-Z]/)) {
    return;
  }
  return {
    name: directiveName,
    from: '@pubinfo/directives',
  };
}

export function PubInfoResolver(): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        return resolveComponent(name);
      },
    },
    {
      type: 'directive',
      resolve: async (name: string) => {
        return resolveDirective(name);
      },
    },
  ];
}
