import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

const Description = (
  <div>
    <p>
      {`KBD component represents a user input, such as a keyboard key or a command
      entered by the user. It is typically displayed in the user's operating
      system's default monospace font, and is often used to represent keyboard
      shortcuts or command-line inputs.`}
    </p>
  </div>
);

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={[]}
      title="Kbd"
      description={Description}
      sourceId="menu/menu.tsx"
      editId="menu"
      features={['Keyboard combinations', 'Custom thickness', 'Custom sizes']}
      properties={[
        {
          default: 'sm',
          description: 'Sets the size of the keyboard display.',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'left',
          description:
            "Sets the button's raised state to either <code>left</code> or <code>right</code>.",
          name: 'buttonRaised',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
