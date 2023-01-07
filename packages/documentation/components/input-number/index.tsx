import DemoPageRenderer from './../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      An input number component is a type of input UI component that allows a
      user to enter a number. It is commonly used in web and mobile application
      development. The component is usually implemented as a text box with
      additional features to support the entry of numeric values.
    </p>
    <p>
      These include a up and down buttons to increment or decrement the value,
      and restrictions on the type of characters that can be entered.
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
      stackBlitzCodes={['red']}
      demoWidget={<Widgets />}
      sourceId="input-number/input-number.tsx"
      editId="input-number"
    ></DemoPageRenderer>
  );
}

export default InputNumber;
