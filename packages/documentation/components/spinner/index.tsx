import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function spinner() {
  return (
    <DemoPageRenderer
      callbacks={[]}
      pageIcon={<FontAwesomeIcon icon={faSlidersH} size="2x" />}
      sourceId="spinner/spinner.tsx"
      editId="spinner"
      features={[]}
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
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-acenzu']}
      demoWidget={<Widgets />}
      title="Spinner"
      description="A spinner is a rotating element that indicates the loading state of a page or a ui element."
    ></DemoPageRenderer>
  );
}

export default spinner;
