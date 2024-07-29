import { mount } from '@vue/test-utils';

function withSetup(composable: () => void) {
  let result: any;
  const warpper = mount({
    setup() {
      result = composable();
      // 忽略模板警告
      return () => {};
    },
  });
  const { router } = warpper;
  return {
    warpper,
    result,
    router,
  };
}

export {
  withSetup,
};
