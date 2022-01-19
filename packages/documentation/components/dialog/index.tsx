import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description="A dialog is a window that displays content in a modal overlay."
      pageIcon={<FontAwesomeIcon icon={faWindowMaximize} size="2x" />}
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
          description: 'callback invoked when ok is pressed',
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
          description: 'width of the dialog',
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '200',
          description: 'height of the dialog',
          name: 'height',
          optional: 'Yes',
          type: 'Number',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-9dnouy']}
      demoWidget={lazy(() => import('./dialog-widgets'))}
    ></DemoPageRenderer>
  );
}

export default dialog;
