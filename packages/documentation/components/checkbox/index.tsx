import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      {`A checkbox is a GUI component that allows a user to make multiple
      selections from a set of options. It is represented as a small square or
      rectangle that can be either checked or unchecked to indicate the user's
      selection. Checkboxes are often used in forms or surveys to gather data
      and are a simple and efficient way for users to make multiple selections.`}
    </p>
  </div>
);

function checkbox() {
  return (
    <DemoPageRenderer
      title="Checkbox"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faCheckSquare} size="2x" />}
      editId="checkbox"
      sourceId="checkbox/checkbox.tsx"
      features={[
        'Custom sizes',
        'Disabled state',
        'Custom outlook (square or rounded)',
      ]}
      callbacks={[
        {
          default: '',
          description: `Callback executed on state change.`,
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: `""`,
          description: `Checkbox label`,
          name: 'label',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: `Disables the button`,
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description: `Sets the size of the button. <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '{}',
          description: `Custom CSS`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'False',
          description: `Makes the component focusable`,
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: `Prop for disabling the button border`,
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: `Prop to set the checkbox to checked state on load`,
          name: 'isChecked',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'Sets the size of the button. <br> <em>sm</em> | <em>md</em> | <em>lg</em>',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-wrjrdy']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default checkbox;
