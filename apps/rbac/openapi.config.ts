import { presetName } from '@pubinfo/preset-openapi';
import { defineConfig } from '@pubinfo/openapi';

export default defineConfig({
  enabled: true,

  presets: [
    presetName({
      functionName: 'camelCase',
    }),
  ],

  imports: { '@/api/request': [{ name: 'basic', as: 'request' }] },
  batch: [
    {
      input: 'http://124.223.184.245:20001/pubinfo-sys/v3/api-docs/auth',
      output: './src/api/modules/auth',
    },
    {
      input: 'http://124.223.184.245:20001/pubinfo-sys/v3/api-docs/rbac',
      output: './src/api/modules/rbac',
    },
    {
      input: 'http://124.223.184.245:20001/pubinfo-sys/v3/api-docs/assist',
      output: './src/api/modules/assist',
    },
    {
      input: 'http://124.223.184.245:20001/pubinfo-sys/v3/api-docs/configData',
      output: './src/api/modules/configData',
    },
    {
      input: 'http://124.223.184.245:20001/pubinfo-sys/v3/api-docs/log',
      output: './src/api/modules/log',
    },
  ],

  hooks: {
    customType(schema, namespace, defaultFn) {
      // `int64` 在前端会精度丢失，可在此处调整对应字段的 `TS类型`
      if (schema?.type === 'integer' && schema?.format === 'int64') {
        return 'number';
      }

      return defaultFn(schema, namespace);
    },
  },
});
