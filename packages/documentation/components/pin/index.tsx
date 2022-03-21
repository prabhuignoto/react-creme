import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Pin() {
  return (
    <DemoPageRenderer
      title="Pin"
      description="Input for entering a pin code."
      features={[]}
      properties={[]}
      tabTitles={['Examples', 'Stackblitz']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-un6jde']}
      sourceId="pin/pin"
      editId="pin"
      pageIcon={<FontAwesomeIcon icon={faKeyboard} />}
    ></DemoPageRenderer>
  );
}

export default Pin;
