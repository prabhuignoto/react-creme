import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Widgets = React.lazy(() => import('./widgets'));

const Description = (
  <div>
    <p>
      The loading indicator is a component that is used to indicate that a
      process is in progress. It is used to show that the user should wait for
      the process to finish.
    </p>
  </div>
);

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-gxoozp']}
      title="Loading Indicator"
      description={Description}
      sourceId="loading-indicator/loading-indicator.tsx"
      editId="loading-indicator"
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
          default: 'md',
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
