import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A password UI component is a form field used to capture a password,
      typically for authentication purposes. It consists of a label and an input
      field where the user can enter their password.{' '}
    </p>
    <p>
      The input field is usually obscured, displaying asterisks instead of the
      actual characters typed, to protect the password from being seen. The
      purpose of a password UI component is to securely collect and store
      passwords while providing a convenient and user-friendly experience.
    </p>
  </div>
);

function Password() {
  return (
    <DemoPageRenderer
      title="Password"
      description={Description}
      pageIcon={<FontAwesomeIcon icon={faEye} size="2x" />}
      sourceId="password/password.tsx"
      editId="password"
      features={[
        'UI Control for showing and hiding password',
        'Customizable size',
        'RTL Support',
      ]}
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
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default Password;
