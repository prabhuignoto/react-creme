import { File, Search, Wrench, Code } from 'lucide-react';

import { MenuBar } from '../../../lib/components';

const icons = [
  <File size={24} key="1" />,
  <Search size={24} key="2" />,
  <Wrench size={24} key="3" />,
  <Code size={24} key="9" />,
];

const items = [
  {
    items: [
      {
        name: 'Open',
      },
      {
        name: 'Save As',
      },
      {
        name: 'Save',
      },
      {
        name: 'Close',
      },
    ],
    name: 'File',
  },
  {
    items: [
      {
        name: 'Cut',
      },
      {
        name: 'Copy',
      },
      {
        name: 'Paste',
      },
      {
        name: 'Select All',
      },
    ],
    name: 'Edit',
  },
  {
    items: [
      {
        name: 'About',
      },
      {
        name: 'Version',
      },
    ],
    name: 'Help',
  },
];

export const Default = <MenuBar items={items} />;
export const RTL = <MenuBar items={items} RTL />;
export const Icons = <MenuBar items={items} icons={icons} />;
export const IconsSmall = <MenuBar items={items.slice(0, 2)} icons={icons} />;
export const Medium = <MenuBar items={items} size="md" />;
export const Large = <MenuBar items={items} size="lg" />;

export const IconsCode = `<MenuBar items={items} icons={[
  <File size={24} key="1" />,
  <Search size={24} key="2" />,
  <Wrench size={24} key="3" />,
  <Code size={24} key="9" />,
]} />`;
