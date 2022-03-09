import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-gxoodzp']}
      title="Menu Bar"
      description={`A menu bar is a graphical control element which contains drop-down menus.
        The menu bar's purpose is to supply a common housing for window- or
        application-specific menus which provide access to such functions as opening files, interacting with an application, or displaying help documentation or manuals`}
      sourceId="menu/menu.tsx"
      editId="menu"
      features={['Custom sizes', 'Support for custom icons', 'RTL rendering']}
      callbacks={[
        {
          default: '',
          description: 'Callback function for when a menu item is selected',
          name: 'onSelect',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: 'false',
          description:
            'Set to true to render the menu bar in a right-to-left direction',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          description:
            'Set to true to disable the unique id generation for menu items',
          name: 'noUniqueId',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '[]',
          description: 'The menu items to render',
          name: 'items',
          optional: 'No',
          type: 'Array<MenuItem>',
        },
        {
          default: 'True',
          description: 'Set to true to make the menu bar focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
