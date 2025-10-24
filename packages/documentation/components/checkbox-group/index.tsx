import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Checkbox Group"
      description={`Checkboxes are used when there is a list of options and the user may select any number of choices, including zero.
      Each checkbox is independent of all other checkboxes in the list, and checking one box doesn’t uncheck the others.`}
      demoWidget={<Widgets />}
      pageIcon={<FontAwesomeIcon icon={faTasks} size="2x" />}
      editId="checkbox-group"
      sourceId="checkbox-group/checkbox-group.tsx"
      features={[
        'Custom sizes',
        'Option to disable checkboxes',
        'RTL Support',
        'Custom checkbox outlook (square or rounded)',
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function to be called when the checkbox group changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '[]',
          description: 'Options to be displayed in the checkbox group.',
          name: 'options',
          optional: 'Yes',
          type: 'Array<Option>',
        },
        {
          default: 'false',
          description:
            'If true, the checkbox group will not generate unique ids for each checkbox.',
          name: 'noUniqueIds',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'square',
          description:
            'checkbox render style. <em>square</em> or <em>round</em>',
          name: 'checkboxStyle',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Disables the checkbox group',
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'vertical',
          description: 'layout of the checkbox group. vertical or horizontal',
          name: 'layout',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'sm',
          description: 'size of the checkbox group',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-npfjx5']}
    ></DemoPageRenderer>
  );
}

export default index;
