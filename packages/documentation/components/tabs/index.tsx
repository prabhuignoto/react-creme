import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function tabs() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-w7jhzj']}
      title="Tabs"
      description="Tabs are used to group and organize content. They can be used to switch between views or to navigate between pages in a document."
      pageIcon={<FontAwesomeIcon icon={faWindowRestore} size="2x" />}
      sourceId="tabs/tabs.tsx"
      editId="tabs"
      properties={[
        {
          default: 'flat',
          description: 'sets the tab style. <em>flat</em> | <em>rounded</em>',
          name: 'tabStyle',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: 'enables or disables the border',
          name: 'border',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '[]',
          description: 'sets the label for each tab',
          name: 'labels',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '[]',
          description: 'prop to disable set of tabs',
          name: 'disabledTabs',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: '{}',
          description: 'Sets any custom CSS properties',
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
        {
          default: 'False',
          description: 'Enables focus outlines for keyboard users',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'False',
          description:
            'Selects a specific tab on load. This should match the label of the tab',
          name: 'activeTab',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tabs;
