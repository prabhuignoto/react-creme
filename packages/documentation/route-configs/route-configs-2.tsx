import { lazy } from 'react';

export const routes = [
  {
    component: lazy(() => import('../components/global-notification')),
    key: 'global-notification',
    path: '/global-notification',
  },
  {
    component: lazy(() => import('../components/image')),
    key: 'image',
    path: '/image',
  },
  {
    component: lazy(() => import('../components/input')),
    key: 'input',
    path: '/input-text',
  },
  {
    component: lazy(() => import('../components/list')),
    key: 'list',
    path: '/list',
  },
  {
    component: lazy(() => import('../components/menu')),
    key: 'menu',
    path: '/menu',
  },
  {
    component: lazy(() => import('../components/menu-button')),
    key: 'menu-button',
    path: '/menu-button',
  },
  {
    component: lazy(() => import('../components/notification')),
    key: 'notification',
    path: '/notification',
  },
  {
    component: lazy(() => import('../components/progress')),
    key: 'progress',
    path: '/progress',
  },
  {
    component: lazy(() => import('../components/radio')),
    key: 'radio',
    path: '/radio',
  },
  {
    component: lazy(() => import('../components/radio-group')),
    key: 'radio-group',
    path: '/radio-group',
  },
  {
    component: lazy(() => import('../components/rate')),
    key: 'rate',
    path: '/rate',
  },
  {
    component: lazy(() => import('../components/reveal')),
    key: 'reveal',
    path: '/reveal',
  },
  {
    component: lazy(() => import('../components/scroll-spy')),
    key: 'scroll-spy',
    path: '/scroll-spy',
  },
  {
    component: lazy(() => import('../components/section')),
    key: 'section',
    path: '/section',
  },
  {
    component: lazy(() => import('../components/sidebar')),
    key: 'sidebar',
    path: '/sidebar',
  },
  {
    component: lazy(() => import('../components/skeleton')),
    key: 'skeleton',
    path: '/skeleton',
  },
  {
    component: lazy(() => import('../components/slider')),
    key: 'slider',
    path: '/slider',
  },
  {
    component: lazy(() => import('../components/splitter')),
    key: 'splitter',
    path: '/splitter',
  },
  {
    component: lazy(() => import('../components/switch')),
    key: 'switch',
    path: '/switch',
  },
  {
    component: lazy(() => import('../components/tabs')),
    key: 'tabs',
    path: '/tabs',
  },
  {
    component: lazy(() => import('../components/tags')),
    key: 'tags',
    path: '/tags',
  },
  {
    component: lazy(() => import('../components/tooltip')),
    key: 'tooltip',
    path: '/tooltip',
  },
  {
    component: lazy(() => import('../components/transfer')),
    key: 'transfer',
    path: '/transfer',
  },
  {
    component: lazy(() => import('../components/tree')),
    key: 'tree',
    path: '/tree',
  },
  {
    component: lazy(() => import('../components/position')),
    key: 'position',
    path: '/position',
  },
  {
    component: lazy(() => import('../components/bread-crumb')),
    key: 'bread-crumb',
    path: '/bread-crumb',
  },
  {
    component: lazy(() => import('../components/form-field')),
    key: 'form-field',
    path: '/form-field',
  },
  {
    component: lazy(() => import('../components/menu-bar')),
    key: 'menu-bar',
    path: '/menu-bar',
  },
  {
    component: lazy(() => import('../components/form-group')),
    key: 'form-group',
    path: '/form-group',
  },
  {
    component: lazy(() => import('../components/file-upload')),
    key: 'file-upload',
    path: '/file-upload',
  },
  {
    component: lazy(() => import('../components/password')),
    key: 'password',
    path: '/password',
  },
  {
    component: lazy(() => import('../components/read-more')),
    key: 'read-more',
    path: '/read-more',
  },
  {
    component: lazy(() => import('../components/gallery')),
    key: 'gallery',
    path: '/gallery',
  },
];

export { routes as routes2 };
