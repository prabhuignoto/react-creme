import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function splitter() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-blpdcl']}
      description="Splitter is a component that can be used to split the screen into two parts. It can be used to create a left and right panel."
      title="Splitter"
      sourceId="splitter/splitter.tsx"
      editId="splitter"
      pageIcon={<FontAwesomeIcon icon={faColumns} size="2x" />}
      properties={[
        {
          default: 'horizontal',
          description:
            'sets the direction of split <em>horizontal</em> | <em>vertical</em>',
          name: 'direction',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: 'enables or disables the border',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '200',
          description: 'Minimum split width',
          name: 'minSplitWidth',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '400',
          description: 'Maximum split width',
          name: 'maxSplitWidth',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '100',
          description: 'Minimum split height',
          name: 'minSplitHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '200',
          description: 'Maximum split height',
          name: 'maxSplitHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '6',
          description: 'width of the drag handle bar',
          name: 'handleBarWidth',
          optional: 'Yes',
          type: 'Number',
        },
      ]}
      demoWidget={lazy(() => import('./widgets'))}
    />
  );
}

export default splitter;
