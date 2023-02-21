import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Widgets = React.lazy(() => import('./widgets'));

const Description = (
  <div>
    <p>
      A Menu component is a graphical control element that provides a list of
      options for a user to choose from. It is often used as a way for a user to
      navigate through a user interface, select different options or features,
      or perform actions within an application or website. A menu may be
      displayed as a list of options that can be accessed by clicking on a
      button.
    </p>
  </div>
);

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-gxoozp']}
      title="Menu"
      description={Description}
      sourceId="menu/menu.tsx"
      editId="menu"
      features={[
        'Custom sizes',
        '3 unique docking positions',
        'Attach menu to any type of target element',
      ]}
      callbacks={[
        {
          default: '',
          description: `Callback fired when the menu is opened`,
          name: 'onOpen',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: `Callback fired when the menu is closed`,
          name: 'onClose',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: `Callback fired when a menu items is selected`,
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'sm',
          description: `The size of the menu. Can be <em>sm</em>, <em>md</em> <em>lg</em>`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'left',
          description: `Docking position of the menu. <br>
          <em>'left'</em> | <em>'right'</em> | <em>center</em>`,
          name: 'align',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '[]',
          description: `Collection of Menu Items`,
          name: 'items',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '{}',
          description: `Custom style object to be applied to the menu`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'True',
          description: `makes the component focusable via keyboard`,
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Hides the arrow on the menu',
          name: 'hideArrow',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '12',
          description: 'The gutter between the menu and the target element',
          name: 'gutter',
          optional: 'Yes',
          type: 'Number',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
