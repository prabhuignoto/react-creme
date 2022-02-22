import React from 'react';
import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

function InputNumber() {
  return (
    <DemoPageRenderer
      title="Input Number"
      description="Input Number is a component that can be used to create a link."
      tabTitles={['examples', 'properties', 'stackblitz']}
      properties={[]}
      stackBlitzCodes={['red']}
      demoWidget={<Widgets />}
      sourceId="link/link.tsx"
      editId="link"
    ></DemoPageRenderer>
  );
}

export default InputNumber;
