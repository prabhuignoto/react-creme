import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A spinner UI component is a graphical element that is used to indicate
      that a process is ongoing. It is often displayed when a webpage or
      application is loading data or performing a task in the background. It is
      typically used to provide visual feedback to the user that an action is in
      progress, rather than indicating that the program has frozen or crashed.
    </p>
  </div>
);

function spinner() {
  return (
    <DemoPageRenderer
      callbacks={[]}
      pageIcon={<FontAwesomeIcon icon={faSlidersH} size="2x" />}
      sourceId="spinner/spinner.tsx"
      editId="spinner"
      features={['Custom sizes', 'Adjustable spinning speed']}
      properties={[
        {
          default: 'sm',
          description:
            'The size of the spinner. Can be <code>sm</code>, <code>md</code> or <code>lg</code>.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'medium',
          description:
            'The speed of the spinner. Can be <code>fast</code>, <code>medium</code> or <code>slow</code>.',
          name: 'speed',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-acenzu']}
      demoWidget={<Widgets />}
      title="Spinner"
      description={Description}
    ></DemoPageRenderer>
  );
}

export default spinner;
