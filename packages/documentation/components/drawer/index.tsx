import React, { lazy } from 'react';
import { Sidebar } from 'react-feather';
import DemoPageRenderer from '../../common/demo-page-renderer';

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-jngeyv']}
      pageIcon={<Sidebar />}
      title="Drawer"
      description={`Drawer is a container that can be opened and closed and can be docked to any side of the screen.
       It can be used as a navigation drawer or a side drawer.`}
      properties={[
        {
          default: 'left',
          description:
            "docking position of the drawer. <em>'left'</em> | <em>'right'</em> | <em>'top'</em> | <em>'bottom'</em>",
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '300',
          description: 'custom height to be used when docked to top or bottom',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '300',
          description: 'custom width to be used when docked to left or right',
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'cubic-bezier(0.79, 0.14, 0.15, 0.86',
          description: 'custom transition for custom animation',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={lazy(() => import('./drawer-widgets'))}
    ></DemoPageRenderer>
  );
}

export default drawer;
