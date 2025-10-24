import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A progress bar is a graphical UI component that is used to visually
      represent the progress of a task. The bar can also be animated to give the
      impression of movement. Progress bars are commonly used in applications
      and websites to show the progress of file downloads, data transfers, and
      other tasks that take a significant amount of time to complete.
    </p>
  </div>
);

function progress() {
  return (
    <DemoPageRenderer
      title="Progress"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faSpinner} size="2x" />}
      editId="progress"
      sourceId="progress/progress.tsx"
      features={[
        'Custom sizes',
        'Indeterminate or determinate progress',
        'Circular progress - Indeterminate',
        'Stateful progress bars. Success, Error',
      ]}
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
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-asnqkz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default progress;
