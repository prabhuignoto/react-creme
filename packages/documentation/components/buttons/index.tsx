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
      features={[
        'Custom sizes',
        'Button Types',
        'Button with loading state',
        'Support for custom Icon',
        'Disabled state',
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function called on <code>onClick</code> event.',
          name: 'onClick',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: `""`,
          description: 'Button label',
          name: 'label',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'default',
          description: `Configures the type of button. Can be
          <br> <em>primary</em> | <em>default</em> | <em>danger</em> | <em>icon</em> | <em>progress</em>`,
          name: 'type',
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
          description: `Custom style object`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'False',
          description: `Makes the component focusable via keyboard`,
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: `Prop for enabling or disabling the button border`,
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
