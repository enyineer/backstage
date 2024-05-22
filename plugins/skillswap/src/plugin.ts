import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const skillswapPlugin = createPlugin({
  id: 'skillswap',
  routes: {
    root: rootRouteRef,
  },
});

export const SkillswapPage = skillswapPlugin.provide(
  createRoutableExtension({
    name: 'SkillswapPage',
    component: () =>
      import('./components/MainPage').then(m => m.MainPage),
    mountPoint: rootRouteRef,
  }),
);
