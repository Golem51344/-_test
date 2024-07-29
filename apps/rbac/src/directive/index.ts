import type { App } from 'vue';
import { setupPermissionDirective } from './plugins/permission';
import { setupWaves } from './plugins/waves';
import { setupTimeago } from './plugins/timeago';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupWaves(app);
  setupTimeago(app);
}
