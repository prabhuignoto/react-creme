import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      A PIN code component is a form field for capturing personal identification
      numbers. It has a label, obscured input field, and may have features such
      as max length and automatic lock. Its purpose is to securely collect PIN
      codes with a user-friendly experience.
    </p>
  </div>
);

function Pin() {
  return (
    <DemoPageRenderer
      title="Pin"
      description={Description}
      features={['Auto focusing input', 'RTL support', 'Custom pin length']}
      callbacks={[
        {
          default: '',
          description: 'Callback executed when the pin changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      properties={[
        {
          default: 'sm',
          description: 'Size of the pin.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '4',
          description: 'Number of digits in the pin.',
          name: 'length',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'false',
          description: 'Whether the pin should be rendered in RTL mode.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'true',
          description:
            'Whether the pin should auto jump to the next input when the current input is filled.',
          name: 'autoJump',
          optional: 'Yes',
          type: 'boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
      stackBlitzCodes={['react-ts-un6jde']}
      sourceId="pin/pin.tsx"
      editId="pin"
      pageIcon={<FontAwesomeIcon icon={faKeyboard} />}
    ></DemoPageRenderer>
  );
}

export default Pin;
