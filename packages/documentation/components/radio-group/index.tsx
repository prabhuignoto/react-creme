import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      title="Radio Group"
      description="Radio group is a group of radio buttons."
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-m9yskx']}
      callbacks={[
        {
          default: '',
          description:
            'Callback function to be executed when an option is selected',
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'column',
          description: 'Layout of the radio group',
          name: 'layout',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '[]',
          description: 'Collection of Options',
          name: 'items',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'false',
          description: 'Disables the complete radio group',
          name: 'disabled',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '{}',
          description: 'Custom Style object',
          name: 'style',
          optional: 'Yes',
          type: 'Object',
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default radioGroup;
