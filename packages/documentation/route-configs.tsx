import React, { lazy } from 'react';
import { routes2 as otherRoutes } from './route-configs-2';

const routes = [
  ...otherRoutes,
  {
    component: React.lazy(() => import('./home')),
    key: 'home',
    path: '/home',
  },
  {
    component: lazy(() => import('./home')),
    key: 'home',
    path: '/',
  },
  {
    component: lazy(() =>
      import('./components/accordion').then(({ Accordion }) => ({
        default: Accordion,
      }))
    ),
    key: 'accordion',
    path: '/accordion',
  },
  {
    component: lazy(() => import('./components/accordion-group')),
    key: 'accordion-group',
    path: '/accordion-group',
  },
  {
    component: lazy(() => import('./components/alerts')),
    key: 'alerts',
    path: '/alerts',
  },
  {
    component: lazy(() => import('./components/auto-suggest')),
    key: 'auto-suggest',
    path: '/auto-suggest',
  },
  {
    component: lazy(() => import('./components/breadcrumb')),
    key: 'breadcrumb',
    path: '/breadcrumb',
  },
  {
    component: lazy(() => import('./components/buttons')),
    key: 'buttons',
    path: '/button',
  },
  {
    component: lazy(() => import('./components/card')),
    key: 'card',
    path: '/card',
  },
  {
    component: lazy(() => import('./components/carousel')),
    key: 'carousel',
    path: '/carousel',
  },
  {
    component: lazy(() => import('./components/checkbox')),
    key: 'checkbox',
    path: '/checkbox',
  },
  {
    component: lazy(() => import('./components/checkbox-group')),
    key: 'checkbox-group',
    path: '/checkbox-group',
  },
  {
    component: lazy(() => import('./components/comparer')),
    key: 'comparer',
    path: '/image-comparer',
  },
  {
    component: lazy(() => import('./components/data-grid')),
    key: 'data-grid',
    path: '/data-grid',
  },
  {
    component: lazy(() => import('./components/dialog')),
    key: 'dialog',
    path: '/dialog',
  },
  {
    component: React.lazy(() => import('./components/draggable')),
    key: 'draggable',
    path: '/draggable',
  },
  {
    component: React.lazy(() => import('./components/drawer')),
    key: 'drawer',
    path: '/drawer',
  },
  {
    component: React.lazy(() => import('./components/dropdown')),
    key: 'dropdown',
    path: '/dropdown',
  },
  {
    component: React.lazy(() => import('./components/page-header')),
    key: 'page-header',
    path: '/page-header',
  },
];

export { routes };
