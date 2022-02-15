import { faArrows } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Position() {
  return (
    <DemoPageRenderer
      title="usePosition"
      description="A hook to position a target element relative to a container element."
      properties={[]}
      tabTitles={['Examples', 'Stackblitz']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-un6jde']}
      sourceId="common/effects/usePosition.ts"
      editId="position"
      pageIcon={<FontAwesomeIcon icon={faArrows} />}
    ></DemoPageRenderer>
  );
}

export default Position;
