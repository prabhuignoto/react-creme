import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import { Widgets } from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      An accordion UI element is a type of graphical user interface element that
      allows users to expand and collapse sections of content within a webpage
      or application. It is often used to display a large amount of content in a
      more organized and manageable way.
    </p>
    <p>
      The accordion UI element consists of a series of vertically stacked
      sections, each with a header and a corresponding body of content. When a
      user clicks on the header of a section, the body of content for that
      section expands and becomes visible, while the bodies of content for the
      other sections are collapsed and hidden. The accordion UI element is
      commonly used in web and mobile design to present a large amount of
      information in a compact and organized way.
    </p>
  </div>
);

const Accordion = () => {
  return (
    <DemoPageRenderer
      description={Description}
      title="Accordion"
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
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
          default: 'false',
          description: 'Enables focus outline',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '#000',
          description: 'Color of the title',
          name: 'titleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#000',
          description: 'Color of the icons',
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Expands the accordion on load',
          name: 'expanded',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'md',
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
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
};

export default Accordion;
