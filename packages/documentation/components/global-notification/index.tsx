import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Global notification"
      description="Grabs the attention of the user by displaying a notification in the top of the screen."
      pageIcon={<FontAwesomeIcon icon={faBullhorn} size="2x" />}
      sourceId="global-notification/global-notification.tsx"
      editId="global-notification"
      features={[
        'Custom sizes',
        'Stateful notifications. Supports success, info, warning and error',
        'Custom animations',
      ]}
      callbacks={[
        {
          default: '',
          description:
            'The callback function to be executed when the notification is closed.',
          name: 'onClose',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '50',
          description: 'Height of the notification.',
          name: 'height',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '0',
          description: 'Delay in ms before the notification appears.',
          name: 'delay',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '3000',
          description: 'Delay in ms before the notification disappears.',
          name: 'closeAfter',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'info',
          description:
            'State of the notification. Can be any one of the following: <br> <em>info</em> | <em>success</em> | <em>warning</em> | <em>error</em>',
          name: 'state',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'Message to be displayed in the notification.',
          name: 'message',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'hide',
          description: `Animation style to be used while showing / hiding the notification. can be <em>hide</em> or <em>shrink</em>`,
          name: 'hideAnimationStyle',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'sm',
          description:
            'Size of the notification. Can be any one of the following: <br> <code>sm</code> | <code>md</code> | <code>lg</code>. Controls the size of the icons and text.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      demoWidget={<Widgets />}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-k4qtvk']}
    ></DemoPageRenderer>
  );
}

export default index;
