import VueDevTools from 'vite-plugin-vue-devtools';

export default function createInspector(env: Record<string, string>) {
  const { VITE_APP_INSPECTOR } = env;
  if (VITE_APP_INSPECTOR && VITE_APP_INSPECTOR === 'true') {
    return VueDevTools();
  }
  else {
    return null;
  }
}
