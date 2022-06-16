import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-gxoozp']}
      title="Menu"
      description="Menu is a component that can be used to display a list of items. It can be docked to any target element and aligned to three supported positions: left, right, and center."
      sourceId="menu/menu.tsx"
      editId="menu"
      features={['Custom sizes', 'Easily align to left, right, or center']}
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
          default: '',
          description: `Any custom CSS`,
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
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
