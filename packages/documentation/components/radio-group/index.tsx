import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      title="Radio Group"
      description={`Radio buttons are an essential element of forms.
      They are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice.
      Clicking a non-selected radio button will deselect whatever other button was previously selected in the list.`}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-m9yskx']}
      pageIcon={<FontAwesomeIcon icon={faTasks} size="2x" />}
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
