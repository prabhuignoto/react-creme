import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Accent, Default, Large, Medium, RTL } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default Render">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Rounded Accent">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="AutoSuggest" width={300} showCodeByDefault={false}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
