import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      stackBlitzCodes={['react-ts-kq6o5l']}
      description={`An Accordion group is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them.
      It is one of many ways you can expose content to users`}
      sourceId="accordion-group/accordion-group.tsx"
      editId="accordion-group"
      pageIcon={<FontAwesomeIcon icon={faMinusSquare} size="2x" />}
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
          description: 'Title for each accordion group',
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
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
