import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Large, Medium, RTL } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default render">
        <DemoWidget name="Password" width={320}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="Password" width={320}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes">
        <DemoWidget name="Password" width={320}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="Password" width={320}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
