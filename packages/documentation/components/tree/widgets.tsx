import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Selection } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget name="Tree" width={400} showCodeByDefault={false}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Selection Mode">
        <BlockQuote>
          In selection mode, individual nodes with its children can be selected
          through the checkbox
        </BlockQuote>
        <DemoWidget name="Tree" width={400} showCodeByDefault={false}>
          {Selection}
        </DemoWidget>
      </Section>
      {/* <Section title="Custom Icon" >
        <BlockQuote>
          Use a custom icon for the expand and collapse actions.
        </BlockQuote>
        <DemoWidget name="Tree" width={300}>{CustomIcon}</DemoWidget>
      </Section> */}
    </div>
  );
}

export default Widgets;
