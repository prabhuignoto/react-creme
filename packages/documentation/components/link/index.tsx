import React, { lazy } from 'react';
import DemoPageRenderer from './../../common/demo-page-renderer';

function Link() {
  return (
    <DemoPageRenderer
      title="Link"
      description="Link is a component that can be used to create a link."
      tabTitles={['examples', 'properties', 'stackblitz']}
      properties={[]}
      stackBlitzCodes={['red']}
      callbacks={[]}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default Link;
