import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Widgets = React.lazy(() => import('./dialog-widgets'));

const Description = (
  <div>
    <p>
      A dialog UI component is a user interface element that allows users to
      interact with a prompt or message in a pop-up window or modal. It is often
      used to display important information or request user input, such as
      confirmation or input fields. Dialog UI components can be triggered by
      buttons, links, or other actions within the user interface.
    </p>
  </div>
);

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faWindowMaximize} size="2x" />}
      sourceId="dialog/dialog.tsx"
      editId="dialog"
      callbacks={[
        {
          default: '',
          description: 'callback invoked on close',
          name: 'onClose',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: 'Callback invoked when Ok is pressed',
          name: 'onSuccess',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      features={[
        'Adjustable height and width',
        'Four different animations for the dialog',
        'Custom sizes',
      ]}
      properties={[
        {
          default: '',
          description: 'Text title for the dialog',
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '300',
          description: 'Minimum width of the dialog',
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '200',
          description: 'Height of the dialog',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'true',
          description: 'Whether the dialog should be focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'pop',
          description: `Animation type to be used for the dialog.
            Can be <code>pop</code> | <code>drop</code> | <code>rise</code> | <code>slide-left</code> | <code>slide-right</code>`,
          name: 'animationType',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'sm',
          description:
            'The size of the dialog. Can be <code>sm</code>, <code>md</code> or <code>lg</code>. Controls the size of the Fonts and the Icons',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default dialog;
