import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function buttons() {
  return (
    <DemoPageRenderer
      title="Buttons"
      description="Buttons are used to perform an action. They can be used in different contexts, such as primary, secondary, danger, or warning."
      pageIcon={<FontAwesomeIcon icon={faHandPointUp} size="2x" />}
      stackBlitzCodes={['react-ts-uy6jjh']}
      callbacks={[
        {
          default: '',
          description: 'Callback function when the button is clicked',
          name: 'onClick',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: `""`,
          description: 'Label of the button',
          name: 'label',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'default',
          description: `configures the type of button.
          <br> <em>primary</em> | <em>default</em> | <em>danger</em> | <em>icon</em> | <em>progress</em>`,
          name: 'type',
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
          description: `Custom style object`,
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
          description: `prop for enabling or disabling the button border`,
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default buttons;
