import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Accent, Default, Large, Medium, RTL } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render" size="md">
        <DemoWidget width={300}>{Default}</DemoWidget>
      </Section>
      <Section title="Rounded Accent" size="md">
        <DemoWidget width={300}>{Accent}</DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <DemoWidget width={300}>{RTL}</DemoWidget>
      </Section>
      <Section title="Custom sizes">
        <DemoWidget width={300}>{Medium}</DemoWidget>
        <DemoWidget width={300}>{Large}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
