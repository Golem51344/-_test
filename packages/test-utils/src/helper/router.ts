import { type RouterMockOptions, createRouterMock } from 'vue-router-mock';

export function setupRouter(options: RouterMockOptions = {}) {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
    ...options,
  });
  return router;
}
