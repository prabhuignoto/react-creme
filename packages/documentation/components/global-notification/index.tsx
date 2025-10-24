import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A global notification UI component is a type of interface element that is
      used to display a message or alert to users throughout an application or
      website. Global notifications are often used to inform users of important
      updates, events, or other information that they need to be aware of.
    </p>
    <p>
      Global notifications are typically designed to be highly visible and
      attention-grabbing, so that users are sure to see them. They may include
      buttons or other interactive elements that allow users to take action,
      such as dismissing the notification or following a link to learn more.
    </p>
  </div>
);

function index() {
  return (
    <DemoPageRenderer
      title="Global notification"
      description={Description}
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
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-k4qtvk']}
    ></DemoPageRenderer>
  );
}

export default index;
