import { transfromRouter } from '@/utils/routerHelper';

describe('backend routing conversion', () => {
  it('happy path', async () => {
    const router = transfromRouter();
    expect(router).toBe(1);
  });
});
