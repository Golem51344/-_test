// @ts-expect-error 当开启文件系统路由时, 移除此行
import { createRouter as createRouterFilesystem, createWebHistory as createWebHistoryFilesystem } from 'vue-router/auto';
import type { Router } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes, constantRoutesByFilesystem } from '@/router/routes';
import setting from '@/settings';

function useCreateRouter(): Router {
  const isFileSystem = setting.app.routeBaseOn === 'filesystem';

  if (isFileSystem) {
    return createRouterFilesystem({
      history: createWebHistoryFilesystem(),
      extendRoutes: constantRoutesByFilesystem,
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 }),
    });
  }
  else {
    return createRouter({
      history: createWebHashHistory(),
      routes: constantRoutes,
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 }),
    });
  }
}

export default useCreateRouter;
