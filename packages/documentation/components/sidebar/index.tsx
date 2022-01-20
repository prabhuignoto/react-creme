import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function sidebar() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-xhgzf5']}
      demoWidget={lazy(() => import('./widgets'))}
      title="Sidebar"
      description="Sidebar is a container for sidebar items. It can be used to display a list of items in a collapsible sidebar."
      pageIcon={<FontAwesomeIcon icon={faArrowLeft} size="2x" />}
      callbacks={[
        {
          default: '',
          description: 'Callback that gets invoked on selecting a sidebar item',
          name: 'onSelect',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '[]',
          description: 'Collection of sidebar items passed in groups',
          name: 'groups',
          optional: 'No',
          type: 'Array',
        },
        {
          default: '#000',
          description: 'Color of the group icon',
          name: 'groupIconColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#000',
          description: 'Color of the group title',
          name: 'groupTitleColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#fff',
          description: 'Background color',
          name: 'backGroundColor',
          optional: 'Yes',
          type: 'String',
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default sidebar;
