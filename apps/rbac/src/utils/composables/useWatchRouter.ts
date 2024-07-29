import type { WatchCallback, WatchOptions } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

export function useWatchRouter() {
  const router = useRouter();
  function watchRouter(watchCallback: WatchCallback<RouteLocationNormalizedLoaded>, options?: WatchOptions) {
    watch(
      router.currentRoute,
      watchCallback,
      options,
    );
  }
  return {
    watchRouter,
  };
}
