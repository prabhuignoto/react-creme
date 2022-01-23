import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function skeleton() {
  return (
    <DemoPageRenderer
      title="Skeleton"
      description="Skeleton is a lightweight component that can be used to display a loading state."
      pageIcon={<FontAwesomeIcon icon={faSpinner} size="2x" />}
      properties={[
        {
          default: '4',
          description: 'Number of rows',
          name: 'rows',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '{}',
          description: `Custom style object`,
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: '30',
          description: 'Height for each row',
          name: 'rowHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'False',
          description: 'Animates the rows',
          name: 'animate',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '4',
          description: 'Configures the number of blocks',
          name: 'blocks',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'False',
          description: 'Shows a circle for each block',
          name: 'showCircle',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-1jank5']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default skeleton;
