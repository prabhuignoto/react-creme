import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      {`A skeleton UI component is a visual placeholder used to indicate loading
      content. It has the same layout and dimensions as the final content, but
      with a gray or empty background. It's used to give users an idea of where
      the content will be placed and how it will be formatted, while providing
      visual feedback that the content is loading.`}
    </p>
  </div>
);

function skeleton() {
  return (
    <DemoPageRenderer
      title="Skeleton"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faSpinner} size="2x" />}
      sourceId="skeleton/skeleton.tsx"
      editId="skeleton"
      features={[
        'Custom row count and height',
        'Easily animate rows',
        'Option to add multiple skeleton blocks',
        'RTL Support',
      ]}
      properties={[
        {
          default: '4',
          description: 'Number of rows',
          name: 'rows',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '{}',
          description: `Custom style object`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: '30',
          description: 'Height for each row',
          name: 'rowHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'False',
          description: 'Animates the rows',
          name: 'animate',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '4',
          description: 'Configures the number of blocks',
          name: 'blocks',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'False',
          description: 'Shows a circle for each block',
          name: 'showCircle',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Right to left support',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default skeleton;
