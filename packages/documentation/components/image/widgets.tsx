import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Expand } from './widget-variants';

function widgets() {
  return (
    <div className={'rc-demo-widgets'}>
      <Section title="Default render">
        <DemoWidget>{Default}</DemoWidget>
      </Section>
      <Section title="Expandable Image">
        <BlockQuote>
          use <code>expandImageOnClick</code> to make image expandable on click.
        </BlockQuote>
        <DemoWidget>{Expand}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
