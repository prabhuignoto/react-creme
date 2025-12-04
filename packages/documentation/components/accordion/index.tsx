import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import { Widgets } from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      An accordion is a UI component that allows users to expand and collapse a
      section of content. It consists of a header and a body, where clicking the
      header toggles the visibility of the body content. It is commonly used to
      display content in a compact and organized way.
    </p>
    <p>
      The accordion component provides a header with a title and an
      expand/collapse icon, and a body that can contain any React content. When
      expanded, the body content becomes visible with smooth animations. The
      component supports controlled and uncontrolled modes, allowing you to
      manage the expanded state programmatically or let users control it through
      interactions.
    </p>
  </div>
);

const Accordion = () => {
  return (
    <DemoPageRenderer
      description={Description}
      title="Accordion"
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-s9qxmk']}
      sourceId="accordion/accordion.tsx"
      editId="accordion"
      features={[
        'Set the accordion to expanded or collapsed on load',
        'Customizable accordion icons',
        'RTL Support',
        'Support for custom sizes: small, medium and large',
      ]}
      pageIcon={<FontAwesomeIcon icon={faMinusSquare} size="2x" />}
      callbacks={[
        {
          default: '',
          description:
            'Callback function executed when the accordion is collapsed.',
          name: 'onCollapsed',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description:
            'Callback function executed when the accordion is expanded.',
          name: 'onExpanded',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description:
            'Callback function executed when the accordion is collapsed or expanded.',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description:
            'Callback function executed when the accordion is rendered',
          name: 'onRendered',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'auto generated',
          description: 'Unique id for the accordion',
          name: 'id',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Aligns the expand/collapse icon to the Right',
          name: 'alignIconRight',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: "''",
          description: 'Title of the accordion',
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'chevron',
          description: `Prop to change the icon type. <br> <em>chevron</em> | <em>plus</em>`,
          name: 'iconType',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Enable or Disable the border around the accordion',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'cubic-bezier(0.19, 1, 0.22, 1)',
          description: 'Custom transition function',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Enables focus outline',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'undefined',
          description: 'Color of the title',
          name: 'titleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'undefined',
          description: 'Color of the icons',
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'null',
          description:
            'Controls the expanded state of the accordion. Can be true (expanded), false (collapsed), or null (uncontrolled)',
          name: 'expanded',
          optional: 'Yes',
          type: 'Boolean | null',
        },
        {
          default: 'sm',
          description:
            'Size of the accordion. Can be <code>sm</code>, <code>md</code> or <code>lg</code>. Controls the size of the Fonts and Icons',
          name: 'size',
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
        {
          default: 'true',
          description: 'Automatically sets the body height based on content',
          name: 'autoSetBodyHeight',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Disables the collapse/expand functionality',
          name: 'disableCollapse',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Hides the expand/collapse icon',
          name: 'disableIcon',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'null',
          description:
            'Custom icon element to replace the default expand/collapse icon',
          name: 'customIcon',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'false',
          description: 'Makes the title text bold',
          name: 'isTitleBold',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Highlights the accordion header when selected',
          name: 'selected',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'undefined',
          description: 'Disables ARIA attributes for accessibility',
          name: 'disableARIA',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Enables animation when expanding/collapsing',
          name: 'animate',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Makes the accordion take full width of its container',
          name: 'fullWidth',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Applies color styling to the header',
          name: 'colorizeHeader',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'undefined',
          description:
            'Custom content to render in the header instead of the title',
          name: 'customContent',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'undefined',
          description: 'Content to display in the accordion body',
          name: 'children',
          optional: 'Yes',
          type: 'ReactNode',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
};

export default Accordion;
