import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function index() {
  return (
    <DemoPageRenderer
      title="Inputs"
      description="Input fields allow users to enter text into a UI. Leading icon(optional) — describe the type of input a text field requires."
      pageIcon={<FontAwesomeIcon icon={faKeyboard} size="2x" />}
      sourceId="input/input.tsx"
      editId="input"
      features={[
        'Custom sizes',
        'RTL Support',
        "Support for adding icons to the input's leading side",
        'Input with states (error, success etc.)',
        'Input accents flat or rounded',
      ]}
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
          type: 'Boolean',
        },
        {
          default: "''",
          description: 'Value of the input',
          name: 'value',
          optional: 'yes',
          type: 'String',
        },
        {
          default: '',
          description: 'Placeholder text',
          name: 'placeholder',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Disables the Input',
          name: 'disabled',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'text',
          description: `Type of input.
          Can be <em>text</em>, <em>password</em>`,
          name: 'type',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'enables the clear button',
          name: 'enableClear',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'default',
          description:
            'State of the input. can be <em>success</em>, <em>error</em> or <em>default</em>',
          name: 'state',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'enables the border',
          name: 'border',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description:
            'Disables the unique id generation. when this prop is set to true, the id need to be manually passed',
          name: 'noUniqueId',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Input ID',
          name: 'id',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'false',
          description: 'Configures the input to be an autocomplete.',
          name: 'isAutoComplete',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'enables focus outlines',
          name: 'focusable',
          optional: 'yes',
          type: 'Boolean',
        },
        {
          default: 'flat',
          description:
            'style accent of the input. can be <em>flat</em> or <em>rounded</em>',
          name: 'accent',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'sm',
          description:
            'size of the input. can be <em>sm</em>, <em>md</em> or <em>lg</em>',
          name: 'size',
          optional: 'yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-dnneps']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
