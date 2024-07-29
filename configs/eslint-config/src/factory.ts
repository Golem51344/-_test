import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import antfu from '@antfu/eslint-config';
import { ignores } from './config/ignores';
import { vue } from './config/vue';
import { stylistic } from './config/stylistic';

export async function pubinfo(): Promise<TypedFlatConfigItem[]> {
  return antfu(
    {
      unocss: false,
    },
    vue(),
    stylistic(),
    ignores(),
  );
}
