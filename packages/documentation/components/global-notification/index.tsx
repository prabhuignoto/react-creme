import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function index() {
  return (
    <DemoPageRenderer
      title="Global notification"
      description="Grabs the attention of the user by displaying a notification in the top of the screen."
      pageIcon={<FontAwesomeIcon icon={faBullhorn} size="2x" />}
      callbacks={[
        {
          default: '',
          description:
            'The callback function to be called when the notification is closed.',
          name: 'onClose',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '50',
          description: 'The height of the notification.',
          name: 'height',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '0',
          description: 'The delay before the notification appears.',
          name: 'delay',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '3000',
          description: 'The delay before the notification disappears.',
          name: 'closeAfter',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'info',
          description: 'The state of the notification.',
          name: 'state',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'The message of the notification.',
          name: 'message',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'hide',
          description: `The animation style used while showing and hiding the notification. can be <em>hide</em> or <em>shrink</em>`,
          name: 'hideAnimationStyle',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      demoWidget={lazy(() => import('./widgets'))}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-k4qtvk']}
    ></DemoPageRenderer>
  );
}

export default index;
