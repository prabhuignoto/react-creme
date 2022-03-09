import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import './draggable.scss';
import Widgets from './widgets';

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="useDraggable"
      features={[
        'Restrict dragging to the containing element',
        'Restrict drag to either Horizontal or Vertical axis',
        'Enable dragging on multiple targets',
      ]}
      properties={[]}
      description="A Hook to enable draggable behavior on a single or a multiple target element."
      tabTitles={['Examples', 'Stackblitz']}
      stackBlitzCodes={['react-ts-re75pw']}
      sourceId="common/effects/useDraggable.ts"
      editId="draggable"
      pageIcon={<FontAwesomeIcon icon={faHandPointer} size="2x" />}
    ></DemoPageRenderer>
  );
}

export default Draggable;
