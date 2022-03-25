import { SidebarGroupModel } from '../../lib/components/sidebar/sidebar-model';

export default [
  {
    items: [
      {
        name: 'Installation',
        value: 'home',
      },
      {
        name: 'Dependencies',
        value: 'home',
      },
      {
        name: 'Browser Support',
        value: 'home',
      },
      {
        name: 'Usage',
        value: 'home',
      },
      {
        name: 'Theme',
        value: 'home',
      },
    ],
    title: 'Getting started',
  },
  {
    items: [
      { name: 'Splitter' },
      { name: 'Accordion' },
      { name: 'Tabs' },
      { name: 'Accordion Group' },
      { name: 'Sidebar' },
      { name: 'image comparer' },
      { name: 'Carousel' },
      // { name: 'Reveal' },
      { name: 'scroll spy' },
    ],
    title: 'Layout',
  },
  {
    items: [
      { name: 'section' },
      { name: 'Card' },
      { name: 'page header' },
      { name: 'Image' },
    ],
    title: 'content',
  },
  {
    items: [
      { name: 'Input Text' },
      { name: 'Input Number' },
      { name: 'Tags' },
      { name: 'Radio Group' },
      { name: 'Checkbox' },
      { name: 'Checkbox Group' },
      { name: 'Switch' },
      { name: 'Dropdown' },
      { name: 'Rate' },
      { name: 'Button' },
      { name: 'Slider' },
      { name: 'Auto Suggest' },
      { name: 'Menu Button' },
      { name: 'Form Field' },
      { name: 'Form Group' },
      { name: 'Pin' },
      { name: 'Password' },
    ],
    title: 'Inputs',
  },
  {
    items: [
      { name: 'Progress' },
      { name: 'Skeleton' },
      { name: 'Notification' },
      { name: 'Global Notification' },
      { name: 'Alerts' },
      { name: 'Spinner' },
    ],
    title: 'Feedback',
  },
  {
    items: [
      { name: 'Tree' },
      { name: 'List' },
      { name: 'Data Grid' },
      { name: 'Transfer' },
      { name: 'Kbd' },
    ],
    title: 'Data',
  },
  {
    items: [{ name: 'Bread Crumb' }, { name: 'Link' }],
    title: 'Navigation',
  },
  {
    items: [
      { name: 'Dialog' },
      { name: 'Drawer' },
      { name: 'Tooltip' },
      { name: 'Menu' },
      { name: 'Menu Bar' },
    ],
    title: 'Overlay',
  },
  {
    items: [{ name: 'draggable' }, { name: 'position' }],
    title: 'Utilities',
  },
] as SidebarGroupModel[];
