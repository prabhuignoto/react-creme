import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './notification-widgets';

function notification() {
  return (
    <DemoPageRenderer
      title="Notification"
      description="Notification is a component that can be used to display any important message to the user. Notifications can be dismissed manually or automatically."
      pageIcon={<FontAwesomeIcon icon={faBell} size="2x" />}
      sourceId="notification/notification.tsx"
      editId="notification"
      features={[
        'Easy docking to 6 different positions',
        'Auto closing notifications',
        'Contained notifications',
      ]}
      callbacks={[
        {
          default: '',
          description: `callback fired after the popup is closed`,
          name: 'onClose',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '300',
          description: `Notification title`,
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'left',
          description: `Docking position of the notification popup. <br>
          <em>top-left</em> | <em>top-right</em> | <em>bottom-left</em> |
          <em>bottom-right</em> | <em>bottom-center</em> | <em>top-center</em>`,
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '350',
          description: `minimum width of the notification popup`,
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '100',
          description: `minimum height of the notification popup`,
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'true',
          description: `Close the notification with a swipe gesture.
            This option is active only when the notification is docked to either left or right side of the screen`,
          name: 'swipeToClose',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '300',
          description: `duration in ms after which the notification would auto close`,
          name: 'autoClose',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'false',
          description: `disables the header`,
          name: 'disableHeader',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'md',
          description:
            'size of the notification. can be <em>sm</em> | <em>md</em> | <em>lg</em>. Controls the size of the icons and text.',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-fwgs9r']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default notification;
