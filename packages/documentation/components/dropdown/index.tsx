import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function dropdown() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description="Dropdown is a component that allows you to select a value from a list of options."
      properties={[
        {
          default: 'False',
          description: `Enables multi selection on the dropdown`,
          name: 'allowMultiSelection',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: `disables the button`,
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: `enables search for the dropdown`,
          name: 'enableSearch',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '200',
          description: `sets the maximum height of the dropdown menu`,
          name: 'maxMenuHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '[]',
          description: `array of option passed during initialization`,
          name: 'options',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: `"Choose an option..."`,
          description: `placeholder for the dropdown`,
          name: 'placeholder',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: `False`,
          description: `virtualizes the dropdown menu`,
          name: 'virtualize',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-b9syfa']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default dropdown;
