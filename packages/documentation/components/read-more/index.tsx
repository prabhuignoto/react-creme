import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import { Widgets } from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      {`Read more is a component that allows you to hide a large amount of text and show it only when the user clicks on the "Read more" button.`}
    </p>
  </div>
);

const ReadMore = () => {
  return (
    <DemoPageRenderer
      description={Description}
      title="Read More"
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-s9qxmk']}
      sourceId="read-more/read-more.tsx"
      editId="read-more"
      features={[
        'Custom Avatar sizes: small, medium and large',
        'Support for rendering custom icon',
      ]}
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

export default ReadMore;
