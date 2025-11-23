import { Section } from '../../../lib/components';
import { MenuButton } from '../../../lib/components/menu-button/menu-button';
import { DemoWidget } from '../../common/demo-widget';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <DemoWidget
          name="MenuButton"
          width={100}
          style={{ marginLeft: '10px' }}
        >
          <MenuButton
            items={['save', 'save as new', 'discard']}
            width={100}
            size="sm"
          />
        </DemoWidget>
      </Section>
      <Section size="md" title="Right to Left" border={false}>
        <DemoWidget name="MenuButton" style={{ marginLeft: '10px' }}>
          <MenuButton
            items={['save', 'save as new', 'discard']}
            width={100}
            RTL
          />
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes" border={false}>
        <DemoWidget name="MenuButton" style={{ marginLeft: '10px' }}>
          <MenuButton
            size="md"
            items={['save', 'save as new', 'discard']}
            width={100}
            RTL
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
