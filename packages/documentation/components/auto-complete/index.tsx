import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function index() {
  return (
    <DemoPageRenderer
      title="Auto Complete"
      description="Auto Complete is a component that provides a dropdown list of suggestions for the user to select from."
      stackBlitzCodes={['react-ts-hf5mto']}
      callbacks={[
        {
          default: '',
          description: 'Callback function when an item is selected',
          name: 'onSelection',
          optional: 'Yes',
          type: 'function',
        },
        {
          default: '',
          description: 'Callback function when the input value changes',
          name: 'onKeyUp',
          optional: 'Yes',
          type: 'function',
        },
        {
          default: '',
          description: 'Callback function when the input value changes',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: '200',
          description: 'Width of the suggestions list',
          name: 'suggestionsWidth',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: '[]',
          description: 'Suggestions to be displayed in the list',
          name: 'suggestions',
          optional: 'Yes',
          type: 'string[]',
        },
        {
          default: '',
          description: 'Placeholder text',
          name: 'placeholder',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'Value of the input',
          name: 'value',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default index;
