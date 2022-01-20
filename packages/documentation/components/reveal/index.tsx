import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function reveal() {
  return (
    <DemoPageRenderer
      title="Reveal"
      description="Reveals content when a user scrolls to it."
      demoWidget={lazy(() => import('./widgets'))}
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      pageIcon={<FontAwesomeIcon icon={faEye} size="2x" />}
    ></DemoPageRenderer>
  );
}

export default reveal;
