import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      An input text component is a type of input UI component that allows a user
      to enter text. It is commonly used in web and mobile application
      development. The component is usually implemented as a text box, which is
      a rectangular box where the user can type in text using a keyboard.
    </p>
  </div>
);

function index() {
  return (
    <DemoPageRenderer
      title="Inputs"
      description={Description}
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
      tabTitles={['Examples', 'Properties', 'Playground']}
      stackBlitzCodes={['react-ts-dnneps']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default index;
