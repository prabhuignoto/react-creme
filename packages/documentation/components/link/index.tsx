import React from 'react';
import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

function Link() {
  return (
    <DemoPageRenderer
      title="Link"
      description="Link is a component that can be used to create a link."
      tabTitles={['examples', 'properties', 'stackblitz']}
      properties={[]}
      stackBlitzCodes={['red']}
      callbacks={[]}
      demoWidget={<Widgets />}
      sourceId="link/link.tsx"
      editId="link"
    ></DemoPageRenderer>
  );
}

export default Link;
