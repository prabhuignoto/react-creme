import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function checkbox() {
  return (
    <DemoPageRenderer
      title="Checkbox"
      description={`A checkbox (check box, tickbox, tick box) is a Graphical widget that permits the user to make a binary choice.`}
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
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-wrjrdy']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default checkbox;
