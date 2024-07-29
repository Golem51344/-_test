import EnvRuntime from 'vite-plugin-env-runtime';

export default function createConfig() {
  return EnvRuntime({
    name: '__PRODUCTION__PUBINFO__CONFIG__',
    filename: 'config.js',
    include: [
      'VITE_APP_TITLE',
      'VITE_APP_API_BASEURL',
      'VITE_APP_API_BASEURL_*',
    ],
  });
}
