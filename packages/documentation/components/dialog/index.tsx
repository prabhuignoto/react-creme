import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './dialog-widgets';

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description="A dialog is a window that displays content in a modal overlay."
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
          description:
            'The animation type to use for the dialog. Can be <code>pop</code> or <code>drop</code>',
          name: 'animationType',
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
