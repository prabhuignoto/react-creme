import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

const Description = (
  <div>
    <p>
      An accordion is a design element that expands in place to expose some
      hidden information. Unlike overlays, accordions push the page content down
      instead of being superposed on top of page content.
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
      pageIcon={<FontAwesomeIcon icon={faMinusSquare} size="2x" />}
      callbacks={[
        {
          default: '',
          description:
            'callback function called when the accordion is collapsed',
          name: 'onCollapsed',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description:
            'callback function called when the accordion is expanded',
          name: 'onExpanded',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'auto generated',
          description: 'unique id for the accordion',
          name: 'id',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Aligns the expand/collapse icon to the Right.',
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
          description: `prop to change the icon type. <br> <em>chevron</em> | <em>plus</em>`,
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
          description: 'custom transition function.',
          name: 'transition',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'enables keyboard focus outline',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '#000',
          description: 'color of the title',
          name: 'titleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#000',
          description: 'color of the icon',
          name: 'iconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'expand the accordion on load',
          name: 'expanded',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      demoWidget={React.lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
};

export { Accordion };
