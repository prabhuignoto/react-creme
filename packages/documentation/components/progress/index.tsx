import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function progress() {
  return (
    <DemoPageRenderer
      title="Progress"
      description={`Progress bars are used to show the completion status of an operation.
      They can be used to show the progress of a task, or the progress of a process.`}
      pageIcon={<FontAwesomeIcon icon={faSpinner} size="2x" />}
      properties={[
        {
          default: 'progressive',
          description: `Type of progress. can be <em>determinate</em> | <em>indeterminate</em>`,
          name: 'type',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '100',
          description: `Max value of the progress in numeric`,
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
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-asnqkz']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default progress;
