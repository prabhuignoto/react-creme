import React from 'react';
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
      callbacks={[]}
      properties={[]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
