import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  ButtonRaisedRight,
  Default,
  largeSized,
  mediumSized,
  smallSized,
  Thickness,
  WithCombination,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default rendering" size="md">
        <DemoWidget name="Kbd">{Default}</DemoWidget>
      </Section>
      <Section title="Keyboard combinations">
        <BlockQuote>
          Keyboard combinations allows you to render a combination of keys.
        </BlockQuote>
        <DemoWidget name="Kbd">{WithCombination}</DemoWidget>
      </Section>
      <Section title="Custom sizes">
        <BlockQuote>
          Three sizes are available: <code>sm</code>, <code>md</code>, and{' '}
          <code>lg</code>
        </BlockQuote>
        <DemoWidget name="Kbd">{smallSized}</DemoWidget>
        <DemoWidget name="Kbd">{mediumSized}</DemoWidget>
        <DemoWidget name="Kbd">{largeSized}</DemoWidget>
      </Section>
      <Section title="Button raised direction">
        <BlockQuote>
          The element is raised to the right by default. This can be changed via
          the <code>buttonRaised</code> prop.
        </BlockQuote>
        <DemoWidget name="Kbd">{ButtonRaisedRight}</DemoWidget>
      </Section>
      <Section title="Keyboard Thickness">
        <BlockQuote>
          Customize the thickness of the keyboard with the{' '}
          <code>thickness</code> prop.
        </BlockQuote>
        <DemoWidget name="Kbd">{Thickness}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
