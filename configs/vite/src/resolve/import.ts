import type { Resolver, ResolverResult } from 'unplugin-auto-import/types';

function resolve(name: string): ResolverResult | undefined {
  if (!name.startsWith('usePub')) {
    return;
  }
  return {
    name,
    from: '@pubinfo/composables',
  };
}

export function PubInfoResolver(): Resolver {
  return (name: string) => {
    return resolve(name);
  };
}
