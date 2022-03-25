import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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
      properties={[]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-acenzu']}
      demoWidget={<Widgets />}
      title="Spinner"
      description="A spinner is a rotating element that indicates the loading state of a page or a ui element."
    ></DemoPageRenderer>
  );
}

export default spinner;
