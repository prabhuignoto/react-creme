import { faHackerNews } from '@fortawesome/free-brands-svg-icons';
import { faFile, faSearch, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MenuBar } from '../../../lib/components';

const icons = [
  <FontAwesomeIcon icon={faFile} key="1" />,
  <FontAwesomeIcon icon={faSearch} key="2" />,
  <FontAwesomeIcon icon={faWrench} key="3" />,
  <FontAwesomeIcon icon={faHackerNews} key="9" />,
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
export const Medium = <MenuBar items={items} size="md" />;
export const Large = <MenuBar items={items} size="lg" />;

export const IconsCode = `<MenuBar items={items} icons={[
  <FontAwesomeIcon icon={faFile} key="1" />,
  <FontAwesomeIcon icon={faSearch} key="2" />,
  <FontAwesomeIcon icon={faWrench} key="3" />,
  <FontAwesomeIcon icon={faHackerNews} key="9" />,
]} />`;
