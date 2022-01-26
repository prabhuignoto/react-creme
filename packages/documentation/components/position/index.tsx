import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function Position() {
  return (
    <DemoPageRenderer
      title="usePosition"
      description="A Custom hook to position of target element relative to a container element."
      properties={[]}
      tabTitles={['Examples', 'Stackblitz']}
      demoWidget={lazy(() => import('./widgets'))}
      stackBlitzCodes={['red']}
    ></DemoPageRenderer>
  );
}

export default Position;
