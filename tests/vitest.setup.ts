import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock';
import { config } from '@vue/test-utils';

/**
 * 设置路由的模拟。
 */
function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
  });

  beforeEach(() => {
    router.reset();
    injectRouterMock(router);
  });

  config.plugins.VueWrapper.install(VueRouterMock);
}

setupRouterMock();
