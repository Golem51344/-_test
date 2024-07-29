import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { GLOB_EXCLUDE } from '../globs';

export async function ignores(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ];
}
