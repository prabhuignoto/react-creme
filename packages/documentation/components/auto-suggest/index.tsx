import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Auto Suggest"
      description="Auto Suggest is a component that allows the user to type in a value and get a list of suggestions. The user can then select a suggestion from the list."
      stackBlitzCodes={['react-ts-hf5mto']}
      pageIcon={<FontAwesomeIcon icon={faMagic} size="2x" />}
      sourceId="auto-suggest/auto-suggest.tsx"
      editId="auto-suggest"
      callbacks={[
        {
          default: '',
          description: 'Callback function executed when an item is selected',
          name: 'onSelection',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: 'Callback function when the input value changes',
          name: 'onKeyUp',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '',
          description: 'Callback function when the input value changes',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '200',
          description: 'Width of the suggestions list',
          name: 'suggestionsWidth',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '[]',
          description: 'Suggestions to be displayed in the list',
          name: 'suggestions',
          optional: 'Yes',
          type: 'String[]',
        },
        {
          default: '',
          description: 'Placeholder text',
          name: 'placeholder',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: 'Value of the input',
          name: 'value',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'flat',
          description:
            'Style accent for the control. Can be <em>Flat</em> or <em>Rounded</em>',
          name: 'accent',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '250',
          description: 'Debounce time in milliseconds',
          name: 'debounce',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'false',
          description: 'Whether the suggestions are provided by the API',
          name: 'apiBacked',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description:
            'Whether to show the spinner. This is useful when the suggestions are provided by the API',
          name: 'showSpinner',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Whether the input is focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description: 'Size of the input',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
