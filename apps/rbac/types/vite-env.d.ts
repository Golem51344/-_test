/// <reference types="vite/client" />

/**
 * ========================================================================
 *                           Helper
 *========================================================================*
 */
type CompressionType = 'gzip' | 'brotli';

type FilterSomeCompressionType<
  T extends string,
> = T extends `${infer U},${infer V}`
  ? U extends V
    ? FilterSomeCompressionType<V>
    : `${U},${FilterSomeCompressionType<V>}`
  : T;

type PermutationCompressionType = FilterSomeCompressionType<`${CompressionType},${CompressionType}`>;

type stringBoolean = 'true' | 'false';

/**
 * ========================================================================
 *                           Vite
 *========================================================================*
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_BASEURL: string
  readonly VITE_APP_DEBUG_TOOL: 'eruda' | 'vconsole'
  readonly VITE_BUILD_MOCK: stringBoolean
  readonly VITE_BUILD_SOURCEMAP: stringBoolean
  readonly VITE_BUILD_COMPRESS: PermutationCompressionType
  readonly VITE_OPEN_PROXY: stringBoolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
