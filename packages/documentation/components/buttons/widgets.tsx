import { Section, Text } from '../../../lib/components';
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
      <Section size="md" title="Default">
        <DemoWidget name="Button" width={80}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Icon">
        <Text>Insert a custom icon to the button.</Text>
        <DemoWidget name="Button" width={150}>
          {Icon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Loading state">
        <Text>
          Use the <code>type</code> property to change the button to a loading
          state.
        </Text>
        <DemoWidget name="Button" width={120}>
          {SearchingState}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled">
        <Text>Buttons can be disabled</Text>
        <DemoWidget name="Button" width={120}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Medium sized button">
        <Text>
          Customize the size of the button by using the <code>size</code> prop
        </Text>
        <DemoWidget name="Button" width={130}>
          {Medium}
        </DemoWidget>
      </Section>
      <Section size="md" title="Button with State (Extra large)">
        <Text>
          Buttons can be in different states. Example shows button in{' '}
          <code>danger</code> state
        </Text>
        <DemoWidget name="Button" width={150}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
