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
      When a panel is expanded, the content within it becomes visible. By
      default, multiple panels can be open simultaneously, but you can configure
      the group to automatically close other panels when one is opened.
      Accordion groups are often used to organize and present large amounts of
      information in a compact, easy-to-navigate format.
    </p>
  </div>
);
function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      stackBlitzCodes={['react-ts-kq6o5l']}
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
          description:
            'Whether to automatically close other accordions when one is expanded.',
          name: 'autoClose',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to show a border around the group.',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'undefined',
          description:
            'The content of the AccordionGroup component. Can be a single ReactNode or an array of ReactNodes (one per accordion).',
          name: 'children',
          optional: 'Yes',
          type: 'ReactNode | ReactNode[]',
        },
        {
          default: 'False',
          description: 'Whether to colorize the header or not.',
          name: 'colorizeHeader',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to disable collapsing of the accordion.',
          name: 'disableCollapse',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to disable the icon or not.',
          name: 'disableIcon',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to disable ARIA attributes or not.',
          name: 'disableARIA',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to expand all accordions by default.',
          name: 'expanded',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'True',
          description: 'Whether the accordion is focusable or not.',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'Whether to make the accordion full width or not.',
          name: 'fullWidth',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '40',
          description: 'Height of the header in px.',
          name: 'headerHeight',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'undefined',
          description: 'The color of the icon.',
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'undefined',
          description:
            'The custom icons for the accordions. Array of ReactNode elements.',
          name: 'icons',
          optional: 'Yes',
          type: 'ReactNode[]',
        },
        {
          default: "'chevron'",
          description:
            "The type of the icon. Can be <code>'chevron'</code> or <code>'plus'</code>.",
          name: 'iconType',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: 'Whether to make the title bold or not.',
          name: 'isTitleBold',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: "'sm'",
          description:
            "The size of the accordion. Can be <code>'sm'</code>, <code>'md'</code> or <code>'lg'</code>.",
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'undefined',
          description: 'The color of the title.',
          name: 'titleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '[]',
          description: 'The titles of the accordions. Array of strings.',
          name: 'titles',
          optional: 'Yes',
          type: 'String[]',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Playground']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
