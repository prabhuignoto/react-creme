import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function buttons() {
  return (
    <DemoPageRenderer
      title="Buttons"
      description={`Buttons are styled links that grab the user's attention and help drive them in a particular direction.
      Buttons can link us to other pages or complete an action like submitting a form or making a purchase`}
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
      demoWidget={<Widgets />}
      sourceId="button/button.tsx"
      editId="buttons"
    ></DemoPageRenderer>
  );
}

export default buttons;
