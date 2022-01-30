import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Widgets from './widgets';
import DemoPageRenderer from '../../common/demo-page-renderer';

function index() {
  return (
    <DemoPageRenderer
      title="Checkbox Group"
      description="Checkbox group is a group of checkboxes that can be used to select multiple options."
      demoWidget={<Widgets />}
      pageIcon={<FontAwesomeIcon icon={faTasks} size="2x" />}
      editId="checkbox-group"
      sourceId="checkbox-group/checkbox-group.tsx"
      callbacks={[
        {
          default: '',
          description:
            'Callback function to be called when the checkbox group changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '[]',
          description: 'Options to be displayed in the checkbox group.',
          name: 'options',
          optional: 'Yes',
          type: 'Array<Option>',
        },
        {
          default: 'false',
          description:
            'If true, the checkbox group will not generate unique ids for each checkbox.',
          name: 'noUniqueIds',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'square',
          description:
            'checkbox render style. <em>square</em> or <em>round</em>',
          name: 'checkboxStyle',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Disables the checkbox group',
          name: 'disabled',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'vertical',
          description: 'layout of the checkbox group. vertical or horizontal',
          name: 'layout',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-npfjx5']}
    ></DemoPageRenderer>
  );
}

export default index;
