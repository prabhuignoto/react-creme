import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function tree() {
  return (
    <DemoPageRenderer
      title="Tree"
      description="Tree is a component that displays a hierarchical data structure with expandable/collapsible nodes."
      sourceId="tree/tree.tsx"
      editId="tree"
      properties={[
        {
          defaultValue: '200',
          description: 'The height of the tree',
          name: 'height',
          optional: 'Yes',
          type: 'number',
        },
        {
          defaultValue: '100',
          description: 'The width of the tree',
          name: 'width',
          optional: 'Yes',
          type: 'number',
        },
        {
          defaultValue: '[]',
          description: 'The items to display in the tree',
          name: 'items',
          optional: 'Yes',
          type: 'array',
        },
        {
          defaultValue: 'true',
          description: 'Whether or not to allow selection',
          name: 'allowSelection',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          defaultValue: '',
          description: 'Callback for when the selection changes',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-bpfa5b']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tree;
