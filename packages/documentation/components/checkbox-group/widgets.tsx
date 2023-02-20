import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomStyle,
  Default,
  Disabled,
  PreSelected,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="CheckBoxGroup" width={100} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Preselected Option">
        <DemoWidget name="CheckBoxGroup" width={200}>
          {PreSelected}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled Option">
        <DemoWidget name="CheckBoxGroup" width={200}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Checkbox Group - Round style">
        <DemoWidget name="CheckBoxGroup" width={150}>
          {CustomStyle}
        </DemoWidget>
      </Section>
      <Section size="md" title="Checkbox Group - RTL">
        <DemoWidget name="CheckBoxGroup" width={150}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
