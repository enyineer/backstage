import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { skillswapPlugin, SkillswapPage } from '../src/plugin';

createDevApp()
  .registerPlugin(skillswapPlugin)
  .addPage({
    element: <SkillswapPage />,
    title: 'Root Page',
    path: '/skillswap',
  })
  .render();
