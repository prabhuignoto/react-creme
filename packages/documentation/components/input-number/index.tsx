import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      An Input number component is a type of form field component that allows a
      user to enter numerical values. It typically consists of a label, an input
      box where the user can type or click on up/down arrows to select a number.
    </p>
    <p>
      Its purpose is to provide a standardized and user-friendly way for users
      to input numerical data in a form, while ensuring that the data entered is
      valid and within a specified range.
    </p>
  </div>
);

function InputNumber() {
  return (
    <DemoPageRenderer
      title="Input Number"
      description={Description}
      tabTitles={['examples', 'properties', 'stackblitz']}
      features={['RTL Support', 'Custom sizes']}
      properties={[
        {
          default: '1',
          description: 'The start value.',
          name: 'start',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'Number.MAX_VALUE',
          description: 'The end value.',
          name: 'end',
          optional: 'Yes',
          type: 'number',
        },
        {
          default: 'sm',
          description: 'The size of the input number.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'false',
          description: 'Enables RTL support.',
          name: 'RTL',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'false',
          description: 'Enables border.',
          name: 'border',
          optional: 'Yes',
          type: 'boolean',
        },
        {
          default: 'Number.MAX_VALUE',
          description: 'The maximum length of the input.',
          name: 'maxLength',
          optional: 'Yes',
          type: 'number',
        },
      ]}
      callbacks={[
        {
          default: '',
          description:
            'Callback function that is called when the value changes.',
          name: 'onChange',
          optional: 'Yes',
          type: 'function',
        },
      ]}
      demoWidget={<Widgets />}
      sourceId="input-number/input-number.tsx"
      editId="input-number"
    ></DemoPageRenderer>
  );
}

export default InputNumber;
