import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Pin() {
  return (
    <DemoPageRenderer
      title="Pin"
      description="Input for entering a pin code."
      features={[]}
      properties={[
        {
          default: 'sm',
          description: 'Size of the pin.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '4',
          description: 'Number of digits in the pin.',
          name: 'length',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'false',
          description: 'Whether the pin should be rendered in RTL mode.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '',
          description: 'Callback for when the pin changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      tabTitles={['Examples', 'Stackblitz']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-un6jde']}
      sourceId="pin/pin"
      editId="pin"
      pageIcon={<FontAwesomeIcon icon={faKeyboard} />}
    ></DemoPageRenderer>
  );
}

export default Pin;
