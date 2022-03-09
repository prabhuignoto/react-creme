import React from 'react';
import { Sidebar } from 'react-feather';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './drawer-widgets';

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-jngeyv']}
      pageIcon={<Sidebar />}
      title="Drawer"
      description={`Drawer is a container that can be opened and closed and can be docked to any side of the screen.
       It can be used as a navigation drawer or a side drawer.`}
      editId="drawer"
      sourceId="drawer/drawer.tsx"
      features={[
        'Four docking positions',
        'Adjustable width and height',
        'Support for Custom transition',
      ]}
      properties={[
        {
          default: 'left',
          description:
            "Docking position of the drawer. <em>'left'</em> | <em>'right'</em> | <em>'top'</em> | <em>'bottom'</em>",
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '300',
          description:
            'Custom height to be used when docked to <em>top</em> or <em>bottom</em>',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '300',
          description:
            'Custom width to be used when docked to <em>left</em> or <em>right</em>',
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'cubic-bezier(0.79, 0.14, 0.15, 0.86',
          description: 'Custom transition for the animation',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Whether the drawer should be focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description: 'Callback invoked when the drawer is closed',
          name: 'onClose',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: 'Callback invoked when the drawer is opened',
          name: 'onOpen',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default drawer;
