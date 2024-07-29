/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-12-14 19:30:47
 * @LastEditors: wsy
 */
declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}
declare const __SYSTEM_INFO__: {
  pkg: {
    version: string
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  lastBuildTime: string
};

declare const _DEV_: boolean;
declare const _PROD_: boolean;

type ConditionalSimplifyDeep<Type, ExcludeType = never, IncludeType = unknown> = Type extends ExcludeType
  ? Type
  : Type extends IncludeType
    ? { [TypeKey in keyof Type]: ConditionalSimplifyDeep<Type[TypeKey], ExcludeType, IncludeType> }
    : Type;

// eslint-disable-next-line ts/ban-types
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

type SimplifyDeep<Type> = ConditionalSimplifyDeep<Type, Function | Iterable<unknown>, object>;
