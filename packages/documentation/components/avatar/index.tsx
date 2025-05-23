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
      sourceId="avatar/avatar.tsx"
      editId="avatar"
      features={['Custom Avatar sizes', 'Support for rendering custom icon']}
      pageIcon={<FontAwesomeIcon icon={faUser} size="2x" />}
      properties={[
        {
          default: '',
          description: 'renders custom icon',
          name: 'children',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'sm',
          description:
            'Size of the Avatar, can be <em>sm</em>, <em>md</em> or <em>lg</em>',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: "''",
          description: 'renders a single letter instead of an icon',
          name: 'letter',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
};

export default Accordion;
