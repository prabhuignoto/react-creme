import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function Position() {
  return (
    <DemoPageRenderer
      title="usePosition"
      description="A Custom hook to calculate the position of an element relative to another element"
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default Position;
