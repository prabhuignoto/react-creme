import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Inputs"
      description="Inputs are used to collect user input."
      pageIcon={<FontAwesomeIcon icon={faKeyboard} size="2x" />}
      sourceId="input/input.tsx"
      editId="input"
      callbacks={[
        {
          default: '',
          description: 'Callback fired on input changes',
          name: 'onChange',
          optional: 'yes',
          type: 'function',
        },
        {
          default: '',
          description: 'Callback fired for every keyUp event',
          name: 'onKeyUp',
          optional: 'yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: 'false',
          description: 'Controlled input',
          name: 'controlled',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: "''",
          description: 'Value of the input',
          name: 'value',
          optional: 'yes',
          type: 'string',
        },
        {
          default: '',
          description: 'Placeholder text',
          name: 'placeholder',
          optional: 'yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Disables the Input',
          name: 'disabled',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'text',
          description: `Type of input.
          Can be <em>text</em>, <em>password</em>`,
          name: 'type',
          optional: 'yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'enables the clear button',
          name: 'enableClear',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'default',
          description:
            'State of the input. can be <em>success</em>, <em>error</em> or <em>default</em>',
          name: 'state',
          optional: 'yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'enables the border',
          name: 'border',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description:
            'Disables the unique id generation. when this prop is set to true, the id need to be manually passed',
          name: 'noUniqueId',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: '',
          description: 'Input ID',
          name: 'id',
          optional: 'yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Configures the input to be an autocomplete.',
          name: 'isAutoComplete',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'true',
          description: 'enables focus outlines',
          name: 'focusable',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'flat',
          description:
            'style accent of the input. can be <em>flat</em> or <em>rounded</em>',
          name: 'accent',
          optional: 'yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-dnneps']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
