import type { Router } from 'vue-router';
import { beforeNavigationGuard } from '@/router/guard/beforeEach';
import { afterNavigationGuard } from '@/router/guard/afterEach';
import { useProgress } from '@/router/plugins/nprogress';
import { normalizePrimitiveToFunction } from '@/utils/index';

interface RegisterNavigation {
  enableProgress: boolean | ((...arg: any) => boolean)
}

export function registerNavigation(router: Router, options: RegisterNavigation = { enableProgress: () => true }) {
  const process = useProgress();

  const {
    enableProgress,
  } = normalizePrimitiveToFunction<RegisterNavigation>(options);

  beforeNavigationGuard(router, async () => {
    if (enableProgress()) {
      process.openProgress();
    }
  });

  afterNavigationGuard(router, () => {
    if (enableProgress()) {
      process.closeProgress();
    }
  });
}
