import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Selection } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={400}>{Default}</DemoWidget>
      </Section>
      <Section title="Selection Mode" size="md">
        <BlockQuote>
          In selection mode, individual nodes with its children can be selected
          through the checkbox
        </BlockQuote>
        <DemoWidget width={400}>{Selection}</DemoWidget>
      </Section>
      {/* <Section title="Custom Icon" size="md">
        <BlockQuote>
          Use a custom icon for the expand and collapse actions.
        </BlockQuote>
        <DemoWidget width={300}>{CustomIcon}</DemoWidget>
      </Section> */}
    </div>
  );
}

export default Widgets;
