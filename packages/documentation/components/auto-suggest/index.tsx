import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function index() {
  return (
    <DemoPageRenderer
      title="Auto Suggest"
      description="Auto Suggest is a component that provides a dropdown list of suggestions for the user to select from."
      stackBlitzCodes={['react-ts-hf5mto']}
      pageIcon={<FontAwesomeIcon icon={faMagic} size="2x" />}
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
        {
          default: 'flat',
          description:
            'Style accent for the control. Can be <em>Flat</em> or <em>Rounded</em>',
          name: 'accent',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '250',
          description: 'Debounce time in milliseconds',
          name: 'debounce',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'false',
          description: 'Whether the suggestions are provided by the API',
          name: 'apiBacked',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          Optional: 'Yes',
          default: 'false',
          description:
            'Whether to show the spinner. This is useful when the suggestions are provided by the API',
          name: 'showSpinner',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Whether the input is focusable',
          name: 'focusable',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default index;
