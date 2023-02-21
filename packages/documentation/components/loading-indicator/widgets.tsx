import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomSpeed, Default, RTL, SquareShape } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom shape">
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {SquareShape}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Speed">
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section size="md" title="Right to Left">
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
