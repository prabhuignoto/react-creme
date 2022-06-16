import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function Password() {
  return (
    <DemoPageRenderer
      title="Password"
      description={`A password field is a special text field on a web form that doesn't display what the user types.
      Each keystroke is represented on the screen by a placeholder character, such as an asterisk or a bullet, so that someone looking over the user's shoulder can't see what they type`}
      pageIcon={<FontAwesomeIcon icon={faEye} size="2x" />}
      sourceId="password/password.tsx"
      editId="password"
      features={[]}
      properties={[
        {
          default: 'false',
          description: 'Set the border of the input',
          name: 'border',
          optional: 'yes',
          type: 'boolean',
        },
        {
          default: 'sm',
          description:
            'Set the size of the input. Can be <code>sm</code>, <code>md</code> or <code>lg</code>',
          name: 'size',
          optional: 'yes',
          type: 'string',
        },
        {
          default: 'Please enter the password...',
          description: 'Set the placeholder text',
          name: 'placeholder',
          optional: 'yes',
          type: 'String',
        },
        {
          default: 'False',
          description: 'Renders the input in RTL mode',
          name: 'RTL',
          optional: 'yes',
          type: 'Boolean',
        },
      ]}
      callbacks={[
        {
          default: '',
          description: 'Callback fired on input changes',
          name: 'onChange',
          optional: 'yes',
          type: 'function',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-dnneps']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default Password;
