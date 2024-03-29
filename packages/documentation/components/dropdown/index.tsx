import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A Dropdown UI component is a graphical user interface element that
      provides a list of options for a user to choose from. The list is usually
      displayed as a drop-down menu when the user clicks on a toggle button or a
      control. Dropdown components are commonly used in forms, navigation menus,
      and other UI elements to allow users to make selections and provide input
      to the system. They provide an efficient and user-friendly way to present
      a large number of options in a limited amount of space.
    </p>
  </div>
);

function dropdown() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="dropdown/dropdown.tsx"
      editId="dropdown"
      features={[
        'Supports both Single and Multiple selection',
        'RTL Support',
        'Custom sizes',
        'Searchable list to filter options',
        'Virtualized list for improved performance',
      ]}
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
        {
          default: 'sm',
          description: `Size of the dropdown. can be <code>sm</code>, <code>md</code> or <code>lg</code>.<br/>
            Controls the size of the icon and font size`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-b9syfa']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default dropdown;
