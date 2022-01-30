import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function progress() {
  return (
    <DemoPageRenderer
      title="Progress"
      description={`Progress bars are used to show the completion status of an operation.
      They can be used to show the progress of a task, or the progress of a process.`}
      pageIcon={<FontAwesomeIcon icon={faSpinner} size="2x" />}
      editId="progress"
      sourceId="progress/progress.tsx"
      properties={[
        {
          default: 'progressive',
          description: `prop to set the type of progress bar. can be <em>determinate</em> | <em>indeterminate</em>`,
          name: 'type',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '100',
          description: `Max value of the progress in numeric.`,
          name: 'maxValue',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '0',
          description: `Current value of the progress in numeric`,
          name: 'currentValue',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'sm',
          description: `Size of the progress bar`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'sm',
          description: `Status of the progress.
          <em>success</em> | <em>error</em> | <em>default</em>`,
          name: 'status',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: `Show the progress percentage`,
          name: 'showProgressValue',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'disappear',
          description:
            'Style to use when indeterminate mode is set. Can be <em>bob</em> or <em>disappear</em>',
          name: 'inDeterminateStyle',
          optional: 'Yes',
          type: `'disappear' | 'bob'`,
        },
        {
          default: '',
          description:
            'This prop can be used to set the <code>aria-valuetext</code> html attribute for the element.',
          name: 'statusText',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-asnqkz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default progress;
