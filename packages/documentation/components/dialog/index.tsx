import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './dialog-widgets';

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description={`A dialog is an overlay that requires the user to interact with it and designed to elicit a response from the user.
      Dialogs inform users about critical information, require users to make decisions, or involve multiple tasks`}
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
      stackBlitzCodes={['react-ts-9dnouy']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default dialog;
