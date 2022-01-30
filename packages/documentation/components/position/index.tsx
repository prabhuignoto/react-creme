import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Position() {
  return (
    <DemoPageRenderer
      title="usePosition"
      description="A Custom hook to position of target element relative to a container element."
      properties={[]}
      tabTitles={['Examples', 'Stackblitz']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['red']}
      sourceId="common/effects/usePosition.ts"
      editId="position"
    ></DemoPageRenderer>
  );
}

export default Position;
