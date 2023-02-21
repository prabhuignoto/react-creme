import { lazy } from 'react';
import { routes2 as otherRoutes } from './route-configs-2';

const routes = [
  ...otherRoutes,
  {
    component: lazy(() => import('../home')),
    key: 'home',
    path: '/home',
  },
  {
    component: lazy(() => import('../home/landing/landing')),
    key: 'home',
    path: '/',
  },
  {
    component: lazy(() => import('../home/landing/landing')),
    key: 'welcome',
    path: '/welcome',
  },
  {
    component: lazy(() => import('../home/landing/landing')),
    key: 'landing',
    path: '/landing',
  },
  {
    component: lazy(() => import('../components/accordion')),
    key: 'accordion',
    path: '/accordion',
  },
  {
    component: lazy(() => import('../components/accordion-group')),
    key: 'accordion-group',
    path: '/accordion-group',
  },
  {
    component: lazy(() => import('../components/alerts')),
    key: 'alerts',
    path: '/alerts',
  },
  {
    component: lazy(() => import('../components/auto-suggest')),
    key: 'auto-suggest',
    path: '/auto-suggest',
  },
  {
    component: lazy(() => import('../components/buttons')),
    key: 'buttons',
    path: '/button',
  },
  {
    component: lazy(() => import('../components/card')),
    key: 'card',
    path: '/card',
  },
  {
    component: lazy(() => import('../components/carousel')),
    key: 'carousel',
    path: '/carousel',
  },
  {
    component: lazy(() => import('../components/checkbox')),
    key: 'checkbox',
    path: '/checkbox',
  },
  {
    component: lazy(() => import('../components/checkbox-group')),
    key: 'checkbox-group',
    path: '/checkbox-group',
  },
  {
    component: lazy(() => import('../components/comparer')),
    key: 'comparer',
    path: '/image-comparer',
  },
  {
    component: lazy(() => import('../components/data-grid')),
    key: 'data-grid',
    path: '/data-grid',
  },
  {
    component: lazy(() => import('../components/dialog')),
    key: 'dialog',
    path: '/dialog',
  },
  {
    component: lazy(() => import('../components/draggable')),
    key: 'draggable',
    path: '/draggable',
  },
  {
    component: lazy(() => import('../components/drawer')),
    key: 'drawer',
    path: '/drawer',
  },
  {
    component: lazy(() => import('../components/dropdown')),
    key: 'dropdown',
    path: '/dropdown',
  },
  {
    component: lazy(() => import('../components/page-header')),
    key: 'page-header',
    path: '/page-header',
  },
  {
    component: lazy(() => import('../components/link')),
    key: 'link',
    path: '/link',
  },
  {
    component: lazy(() => import('../components/input-number')),
    key: 'input-number',
    path: '/input-number',
  },
  {
    component: lazy(() => import('../components/kbd')),
    key: 'kbd',
    path: '/kbd',
  },
  {
    component: lazy(() => import('../components/pin')),
    key: 'pin',
    path: '/pin',
  },
  {
    component: lazy(() => import('../components/spinner')),
    key: 'spinner',
    path: '/spinner',
  },
  {
    component: lazy(() => import('../components/avatar')),
    key: 'avatar',
    path: '/avatar',
  },
  {
    component: lazy(() => import('../components/loading-indicator')),
    key: 'loading-indicator',
    path: '/loading-indicator',
  },
];

export { routes };
