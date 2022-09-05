import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <DemoWidget name="Section" fullWidth>
        <Section size="md" title="Default rendering">
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
      <DemoWidget name="Section" fullWidth>
        <Section size="md" title="Right to Left" RTL>
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
    </div>
  );
}

export default Widgets;
