import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      An accordion group is a type of interface element that allows users to
      toggle the display of content within a container by clicking on a heading
      element. The content within the group is often organized into a series of
      collapsible panels, each with its own heading element.
    </p>
    <p>
      When a panel is expanded, the content within it becomes visible, while the
      content in other panels is hidden. Accordion groups are often used to
      organize and present large amounts of information in a compact,
      easy-to-navigate format.
    </p>
  </div>
);
function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      description={Description}
      sourceId="accordion-group/accordion-group.tsx"
      editId="accordion-group"
      pageIcon={<FontAwesomeIcon icon={faMinusSquare} size="2x" />}
      features={[
        'Auto closing accordion sections',
        'Customizable accordion icons',
        'Support for custom sizes: small, medium and large',
      ]}
      properties={[
        {
          default: 'False',
          description: 'Aligns the chevron icon to the right.',
          name: 'alignIconRight',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Prop to set the border.',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '[]',
          description: 'Title for each accordion group.',
          name: 'titles',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'close',
          description: `initial state of all the accordion groups. <br> <em>"close"</em> | <em>"open"</em>`,
          name: 'initialState',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: `Auto closes other groups when a group is open`,
          name: 'autoClose',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '#000',
          description: 'Title color',
          name: 'titleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#000',
          description: 'Icon color.',
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '40',
          description: 'Height of the header in px',
          name: 'headerHeight',
          optional: 'Yes',
          type: 'Number',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
