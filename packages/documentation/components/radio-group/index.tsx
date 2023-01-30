import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A Radio group is a UI component that allows users to select one option
      from a list of mutually exclusive options. It consists of a series of
      radio buttons, each associated with a label, and only one button can be
      selected at a time.{' '}
    </p>
    <p>
      The purpose of a radio group is to provide a clear and intuitive way for
      users to make a single selection from a list of options.
    </p>
  </div>
);

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Radio Group"
      description={Description}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-m9yskx']}
      pageIcon={<FontAwesomeIcon icon={faTasks} size="2x" />}
      sourceId="radio-group/radio-group.tsx"
      editId="radio-group"
      features={[
        'Custom sizes',
        'RTL Support',
        'Option to disable radio buttons',
        'Vertical or Horizontal layout',
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function to be executed when an option is selected',
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'column',
          description: 'Layout of the radio group',
          name: 'layout',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '[]',
          description: 'Collection of Options',
          name: 'items',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'false',
          description: 'Disables the complete radio group',
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '{}',
          description: 'Custom Style object',
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'sm',
          description:
            'Size of the radio group. <em>sm</em> | <em>md</em> | <em>lg</em>',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default radioGroup;
