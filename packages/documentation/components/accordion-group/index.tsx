import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      stackBlitzCodes={['react-ts-kq6o5l']}
      description={`An accordion group is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them.
      It is one of many ways you can expose content to users`}
      pageIcon={<FontAwesomeIcon icon={faMinusSquare} size="2x" />}
      properties={[
        {
          default: 'False',
          description: 'aligns the chevron icon to the right',
          name: 'alignIconRight',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description: 'prop to set the border for the component',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '[]',
          description: 'prop to set the title for each accordion group',
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
          description: `prop to auto close other groups when a group is open`,
          name: 'autoClose',
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
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={React.lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
