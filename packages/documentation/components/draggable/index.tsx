import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import './draggable.scss';

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      title="useDraggable"
      properties={[]}
      description="React Hook to enable draggable functionality"
      tabTitles={['Examples', 'Stackblitz']}
      stackBlitzCodes={['react-ts-re75pw']}
      sourceId="common/effects/useDraggable.ts"
      editId="draggable"
      pageIcon={<FontAwesomeIcon icon={faHandPointer} size="2x" />}
    ></DemoPageRenderer>
  );
}

export default Draggable;
