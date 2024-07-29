import type { Pinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { PersistedStateFactoryOptions, Serializer } from 'pinia-plugin-persistedstate';
import storage from '@/utils/storage';

export function customSerializer(): Serializer {
  return {
    deserialize: (value) => {
      return JSON.parse(value);
    },
    serialize: (value) => {
      return JSON.stringify(value);
    },
  };
}

export function createPersistedStateOptions(): PersistedStateFactoryOptions {
  return {
    storage: storage.local,
    key: id => `_${id}`,
    serializer: customSerializer(),
  };
}

export function registerPiniaPersistPlugin(pinia: Pinia) {
  pinia.use(createPersistedState(createPersistedStateOptions()));
}
