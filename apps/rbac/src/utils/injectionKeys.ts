import type { InjectionKey } from 'vue';

export function createInjectionKey<T = any>(key: string): InjectionKey<T> {
  return key as unknown as InjectionKey<T>;
}

export const i18nTitleInjectionKey = createInjectionKey<Function>('i18nTitle');
export const rootMenuInjectionKey = createInjectionKey<any>('rootMenu');

export const PassWordStrengthValidator = createInjectionKey<Ref>('passWordStrengthValidator');
