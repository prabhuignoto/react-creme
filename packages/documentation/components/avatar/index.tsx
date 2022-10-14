import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import { Widgets } from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      {`Avatar is a component that displays a user's profile picture or initials.`}
    </p>
  </div>
);

const Accordion = () => {
  return (
    <DemoPageRenderer
      description={Description}
      title="Avatar"
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-s9qxmk']}
      sourceId="avatar/avatar.tsx"
      editId="avatar"
      features={[
        'Custom Avatar sizes: small, medium and large',
        'Support for rendering custom icon',
      ]}
      pageIcon={<FontAwesomeIcon icon={faUser} size="2x" />}
      properties={[
        {
          default: 'auto generated',
          description: 'Unique id for the accordion',
          name: 'id',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Aligns the expand/collapse icon to the Right',
          name: 'alignIconRight',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: "''",
          description: 'Title of the accordion',
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'chevron',
          description: `Prop to change the icon type. <br> <em>chevron</em> | <em>plus</em>`,
          name: 'iconType',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Enable or Disable the border around the accordion',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'cubic-bezier(0.19, 1, 0.22, 1)',
          description: 'Custom transition function',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
};

export default Accordion;
