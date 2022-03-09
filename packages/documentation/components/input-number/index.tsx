import React from 'react';
import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

function InputNumber() {
  return (
    <DemoPageRenderer
      title="Input Number"
      description="An Input Number is a two-segment UI control used to incrementally increase or decrease a numeric value."
      tabTitles={['examples', 'properties', 'stackblitz']}
      features={['RTL Support', 'Custom sizes']}
      properties={[
        {
          default: '1',
          description: 'The start value.',
          name: 'start',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'Number.MAX_VALUE',
          description: 'The end value.',
          name: 'end',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'sm',
          description: 'The size of the input number.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Enables RTL support.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Enables border.',
          name: 'border',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function that is called when the value changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      stackBlitzCodes={['red']}
      demoWidget={<Widgets />}
      sourceId="input-number/input-number.tsx"
      editId="input-number"
    ></DemoPageRenderer>
  );
}

export default InputNumber;
