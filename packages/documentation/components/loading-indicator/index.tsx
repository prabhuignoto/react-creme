import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Widgets = React.lazy(() => import('./widgets'));

const Description = (
  <div>
    <p>
      A loading indicator component is a visual element that is commonly used in
      user interfaces to indicate that a process or action is taking place in
      the background, and the user needs to wait for the process to complete
      before they can interact with the interface.
    </p>
  </div>
);

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-gxoozp']}
      title="Loading Indicator"
      description={Description}
      sourceId="loading-indicator/loading-indicator.tsx"
      editId="loading-indicator"
      pageIcon={<FontAwesomeIcon icon={faBarsProgress} size="2x" />}
      features={[
        'Customizable shape,speed and size',
        'Customizable number of items',
        'RTL support',
      ]}
      properties={[
        {
          default: 3,
          description: 'Number of items in the loading indicator',
          name: 'count',
          optional: true,
          type: 'Number',
        },
        {
          default: 'square',
          description:
            'Shape of the loading indicator. can be <code>square</code> or <code>circle</code>',
          name: 'shape',
          optional: true,
          type: 'String',
        },
        {
          default: 'false',
          description: 'Direction of the loading indicator',
          name: 'rtl',
          optional: true,
          type: 'Boolean',
        },
        {
          default: 'slow',
          description:
            'Speed of the loading indicator. can be <code>slow</code>, <code>normal</code> or <code>fast</code>',
          name: 'speed',
          optional: true,
          type: 'String',
        },
        {
          default: 'sm',
          description:
            'Size of the loading indicator. can be <code>sm</code>, <code>md</code> or <code>lg</code>',
          name: 'size',
          optional: true,
          type: 'String',
        },
        {
          default: '0',
          description:
            'Custom size of the loading indicator. Allows to set a custom size in pixels',
          name: 'customSize',
          optional: true,
          type: 'Number',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
