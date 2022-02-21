import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function formField() {
  return (
    <DemoPageRenderer
      title="Dropdown"
      description="Dropdown is a component that allows the user to select a value from a list of options."
      pageIcon={<FontAwesomeIcon icon={faThList} size="2x" />}
      sourceId="dropdown/dropdown.tsx"
      editId="dropdown"
      properties={[
        {
          default: 'Please enter the name',
          description: 'Label of the form field.',
          name: 'label',
          optional: 'No',
          type: 'string',
        },
        {
          default: 'Your name',
          description: 'Placeholder of the form field.',
          name: 'placeholder',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'Icon of the form field.',
          name: 'icon',
          optional: 'Yes',
          type: 'ReactNode',
        },
        {
          default: 'sm',
          description:
            'Size of the form field. Can be <em>sm</em>, <em>md</em>, <em>lg</em>.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'true',
          description: 'Whether to show border or not.',
          name: 'border',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: '200ms',
          description: 'Debounce time in milliseconds.',
          name: 'debounce',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'default',
          description:
            'State of the form field. can be <em>default</em>, <em>error</em>, <em>success</em>.',
          name: 'state',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Whether to show the component in RTL or not.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },

        {
          default: '',
          description: 'Value of the form field.',
          name: 'value',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Whether to disable the form field or not.',
          name: 'disabled',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function that is called when the value of the form field changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-b9syfa']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default formField;
