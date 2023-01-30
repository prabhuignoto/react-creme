import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A form field component is a fundamental building block of a form, and is
      used to collect information from a user. It typically consists of a label,
      input field, and, in some cases, validation messages to provide feedback
      to the user.
    </p>
    <p>
      Form fields can be of various types, including text input fields,
      drop-down menus, checkboxes, and radio buttons, among others. The purpose
      of a form field component is to ensure that the user provides the required
      information in a clear, concise and standardized manner, making it easier
      for the form to be processed and understood.
    </p>
  </div>
);

function formField() {
  return (
    <DemoPageRenderer
      title="Form field"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="dropdown/dropdown.tsx"
      editId="dropdown"
      features={[
        'Custom sizes',
        'RTL Support',
        'Custom icon for labels',
        'Disabled state',
      ]}
      properties={[
        {
          default: 'Please enter the name',
          description: 'Label of the form field.',
          name: 'label',
          optional: 'No',
          type: 'string',
        },
        {
          default: '',
          description: 'Icon of the form field.',
          name: 'icon',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'sm',
          description:
            'Size of the form field. Can be <em>sm</em>, <em>md</em>, <em>lg</em>.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'true',
          description: 'Whether to show border or not.',
          name: 'border',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Whether to show the component in RTL or not.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Whether to disable the form field or not.',
          name: 'disabled',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function that is called when the value of the form field changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-b9syfa']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formField;
