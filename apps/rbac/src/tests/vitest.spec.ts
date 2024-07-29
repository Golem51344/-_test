import { withSetup } from '@pubinfo/test-utils';
import { ref } from 'vue';

describe('vitest server check', () => {
  it('test-utils', () => {
    const { result } = withSetup(() => {
      const a = ref(1);
      return a;
    });
    expect(result).toBeTruthy();
  });
});
