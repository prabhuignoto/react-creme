import React from 'react';
import { Sidebar } from 'react-feather';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Widgets = React.lazy(() => import('./drawer-widgets'));

const Description = (
  <div>
    <p>
      A drawer UI component is a user interface element that is used to display
      and organize content in a sliding panel that can be opened and closed. It
      is typically used to display menu options, settings, or additional content
      that is not critical to the main task at hand.
    </p>
    <p>
      Drawer UI components are often found in mobile or web applications and can
      be activated by a button or swipe gesture. They can also be used to
      display notifications or alerts in a non-intrusive manner.
    </p>
  </div>
);

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-jngeyv']}
      pageIcon={<Sidebar />}
      title="Drawer"
      description={Description}
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
          default: '<code>cubic-bezier(0.79, 0.14, 0.15, 0.86</code>',
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
