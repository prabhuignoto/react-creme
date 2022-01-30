import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function transfer() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Transfer"
      description="Transfer is a component that allows you to transfer items between two lists."
      pageIcon={<FontAwesomeIcon icon={faExchangeAlt} size="2x" />}
      sourceId="transfer/transfer.tsx"
      editId="transfer"
      callbacks={[
        {
          default: '',
          description: 'Callback function fired when items are transferred',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '[]',
          description: 'Source array for list one',
          name: 'list1',
          optional: 'Yes',
          type: 'array',
        },
        {
          default: '[]',
          description: 'Source array for list two',
          name: 'list2',
          optional: 'Yes',
          type: 'array',
        },
        {
          default: 'false',
          description: 'Enable virtualization of the lists',
          name: 'virtualize',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Enable search functionality',
          name: 'enableSearch',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-q3izbn']}
    ></DemoPageRenderer>
  );
}

export default transfer;
