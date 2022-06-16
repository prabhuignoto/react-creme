import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={[]}
      title="Kbd"
      description="Renders a keyboard key or a combination of keys."
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
