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
      callbacks={[
        {
          default: '',
          description: `Callback fired when the state changes`,
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: `""`,
          description: `label for the checkbox`,
          name: 'label',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: `disables the button`,
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description: `sets the size of the button. <br> <em>sm</em> | <em>md</em> | <em>lg</em>`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '{}',
          description: `any custom CSS`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'False',
          description: `makes the component focusable via keyboard`,
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: `prop for disabling the button border`,
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: `prop to set the checkbox to checked state on load`,
          name: 'isChecked',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'sets the size of the button. <br> <em>sm</em> | <em>md</em> | <em>lg</em>',
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
