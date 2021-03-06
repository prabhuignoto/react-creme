import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  Disabled,
  Icon,
  Large,
  Medium,
  SearchingState,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={80}>{Default}</DemoWidget>
      </Section>
      <Section title="Icon" size="md">
        <BlockQuote>Insert a custom icon to the button.</BlockQuote>
        <DemoWidget width={150}>{Icon}</DemoWidget>
      </Section>
      <Section title="Loading state" size="md">
        <BlockQuote>
          Use the <code>type</code> property to change the button to a loading
          state.
        </BlockQuote>
        <DemoWidget width={120}>{SearchingState}</DemoWidget>
      </Section>
      <Section title="Disabled" size="md">
        <BlockQuote>Buttons can be disabled</BlockQuote>
        <DemoWidget width={120}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Medium sized button" size="md">
        <BlockQuote>
          Customize the size of the button by using the <code>size</code> prop
        </BlockQuote>
        <DemoWidget width={130}>{Medium}</DemoWidget>
      </Section>
      <Section title="Button with State (Extra large)" size="md">
        <BlockQuote>
          Buttons can be in different states. Example shows button in{' '}
          <code>danger</code> state
        </BlockQuote>
        <DemoWidget width={150}>{Large}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
