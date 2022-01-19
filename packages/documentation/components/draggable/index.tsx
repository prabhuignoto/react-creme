import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import './draggable.scss';

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      title="Draggable"
      description="React Hook to enable draggable functionality"
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-re75pw']}
      pageIcon={<FontAwesomeIcon icon={faHandPointer} size="2x" />}
    ></DemoPageRenderer>
  );
}

export default Draggable;
