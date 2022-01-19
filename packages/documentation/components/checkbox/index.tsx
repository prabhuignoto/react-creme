import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function checkbox() {
  return (
    <DemoPageRenderer
      title="Checkbox"
      description={`Checkboxes are used when there is a list of options and the user may select any number of choices, including zero.
      Each checkbox is independent of all other checkboxes in the list, and checking one box doesn’t uncheck the others.`}
      pageIcon={<FontAwesomeIcon icon={faCheckSquare} size="2x" />}
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
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-wrjrdy']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default checkbox;
