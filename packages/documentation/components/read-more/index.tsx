import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
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
        'Custom sizes',
        'Configure the number of lines to be shown',
        'Supports RTL',
      ]}
      pageIcon={<FontAwesomeIcon icon={faEllipsis} size="2x" />}
      properties={[
        {
          default: '',
          description: 'Renders the component in RTL mode',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description: 'Controls the size of the component',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '4',
          description: 'Number of lines to be shown when the text is collapsed',
          name: 'linesToShow',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'Read More',
          description:
            'Text to be shown on the button when the text is collapsed',
          name: 'readMoreText',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'Show Less',
          description:
            'Text to be shown on the button when the text is expanded',
          name: 'showLessText',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
};

export default ReadMore;
