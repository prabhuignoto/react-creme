import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Selection } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default render">
        <DemoWidget name="Tree" width={400} showCodeByDefault={false}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Selection Mode">
        <Text>
          In selection mode, individual nodes with its children can be selected
          through the checkbox
        </Text>
        <DemoWidget name="Tree" width={400} showCodeByDefault={false}>
          {Selection}
        </DemoWidget>
      </Section>
      {/* <Section size="md"  title="Custom Icon" >
        <Text>
          Use a custom icon for the expand and collapse actions.
        </Text>
        <DemoWidget name="Tree" width={300}>{CustomIcon}</DemoWidget>
      </Section> */}
    </div>
  );
}

export default Widgets;
