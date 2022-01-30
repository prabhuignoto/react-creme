import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function dropdown() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description="Dropdown is a component that allows the user to select a value from a list of options."
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="dropdown/dropdown.tsx"
      editId="dropdown"
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
        {
          default: 'False',
          description: 'Right to left support',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Color of the Chevron icon',
          name: 'chevronIconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Shows the  clear button',
          name: 'showClearBtn',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-b9syfa']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default dropdown;
