import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Alerts"
      description="Alerts are used to notify the user of an important event."
      sourceId="alert/alert.tsx"
      editId="alerts"
      pageIcon={<FontAwesomeIcon icon={faExclamation} size="2x" />}
      callbacks={[
        {
          default: '',
          description: 'The function to call when the alert is dismissed.',
          name: 'onDismiss',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '',
          description: `The message to display in the alert.`,
          name: 'message',
          optional: 'No',
          type: 'string',
        },
        {
          default: '100',
          description: 'The height of the alert box.',
          name: 'height',
          optional: 'No',
          type: 'number',
        },
        {
          default: 'info',
          description:
            'The state of the alert. can be one of <em>success</em> | <em>error</em> | <em>warning</em> | <em>info</em>',
          name: 'state',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'true',
          description: 'Whether or not the alert can be dismissed.',
          name: 'canDismiss',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-fvmzp5']}
      demoWidget={<Widgets />}
    />
  );
}

export default index;
