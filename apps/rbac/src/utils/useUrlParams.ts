import { useUrlSearchParams } from '@vueuse/core';

const params = useUrlSearchParams('history');

export async function useUrlParams() {
  if (params.auth) {
    // ...
  }
}
