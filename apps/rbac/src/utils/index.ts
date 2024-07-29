import path from 'path-browserify';
import type { Primitive } from 'type-fest';
import { isArray, isEmpty, isObject, reduce } from 'lodash-es';

export function resolveRoutePath(basePath?: string, routePath?: string) {
  return basePath ? path.resolve(basePath, routePath ?? '') : routePath ?? '';
}

export function normalizePrimitiveToFunction<T extends Record<PropertyKey, any>>(options: T): ConditionalExceptType<T, Primitive> {
  for (const key in options) {
    if (typeof options[key] !== 'function') {
      const value = options[key]
      ;(options[key] as () => typeof value) = () => value;
    }
  }
  return options;
}

export function objectToPaths(obj: Record<string, any>, prefix = '') {
  return reduce(obj, (result, value, key) => {
    const fullPath = prefix.length ? `${prefix}.${key}` : key;
    if (isObject(value) && !isArray(value) && !isEmpty(value)) {
      // 如果是非空对象，递归调用
      result = result.concat(objectToPaths(value, fullPath));
    }
    else {
      // 否则，添加当前路径到结果数组
      result.push(fullPath);
    }
    return result;
  }, [] as string[]);
}
