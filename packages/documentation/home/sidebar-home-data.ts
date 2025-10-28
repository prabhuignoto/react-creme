import { SidebarGroupModel } from '../../lib/components/sidebar/sidebar-model';

export default [
  {
    items: [
      {
        name: 'Installation',
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
      // {
      //   name: 'Dependencies',
      //   value: 'home',
      // },
      // {
      //   name: 'Browser Support',
      //   value: 'home',
      // },
    ],
    title: 'Getting started',
  },
  {
    items: [
      // { name: 'Reveal' },
      { name: 'Accordion Group' },
      { name: 'Accordion' },
      { name: 'Carousel' },
      { name: 'Sidebar' },
      { name: 'Splitter' },
      { name: 'Tabs' },
      { name: 'image comparer' },
      { name: 'scroll spy' },
    ],
    title: 'Layout',
  },
  {
    items: [
      { name: 'Avatar' },
      { name: 'Card' },
      { name: 'Gallery' },
      { name: 'Image' },
      { name: 'Read More' },
      { name: 'page header' },
      { name: 'section' },
    ],
    title: 'content',
  },
  {
    items: [
      { name: 'Auto Suggest' },
      { name: 'Button' },
      { name: 'Checkbox Group' },
      { name: 'Checkbox' },
      { name: 'Dropdown' },
      { name: 'File Upload' },
      { name: 'Form Field' },
      { name: 'Form Group' },
      { name: 'Input Number' },
      { name: 'Input Text' },
      { name: 'Menu Button' },
      { name: 'Password' },
      { name: 'Pin' },
      { name: 'Radio Group' },
      { name: 'Rate' },
      { name: 'Slider' },
      { name: 'Switch' },
      { name: 'Tags' },
    ],
    title: 'Inputs',
  },
  {
    items: [
      { name: 'Alerts' },
      { name: 'Global Notification' },
      { name: 'Notification' },
      { name: 'Progress' },
      { name: 'Skeleton' },
      { name: 'Spinner' },
      { name: 'Loading Indicator' },
    ],
    title: 'Feedback',
  },
  {
    items: [
      { name: 'Data Grid' },
      { name: 'Kbd' },
      { name: 'List' },
      { name: 'Transfer' },
      { name: 'Tree' },
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
      { name: 'Menu Bar' },
      { name: 'Menu' },
      { name: 'Tooltip' },
    ],
    title: 'Overlay',
  },
  {
    items: [{ name: 'draggable' }, { name: 'position' }],
    title: 'Utilities',
  },
] as SidebarGroupModel[];
