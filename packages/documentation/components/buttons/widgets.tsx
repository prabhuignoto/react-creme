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
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="Button" width={80} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Icon" border={false}>
        <Text>Insert a custom icon to the button.</Text>
        <DemoWidget name="Button" width={150} showCodeByDefault>
          {Icon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Loading state" border={false}>
        <Text>
          Use the <code>type</code> property to change the button to a loading
          state.
        </Text>
        <DemoWidget name="Button" width={120} showCodeByDefault>
          {SearchingState}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled" border={false}>
        <Text>Buttons can be disabled</Text>
        <DemoWidget name="Button" width={120} showCodeByDefault>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Medium sized button" border={false}>
        <Text>
          Customize the size of the button by using the <code>size</code> prop
        </Text>
        <DemoWidget name="Button" width={130} showCodeByDefault>
          {Medium}
        </DemoWidget>
      </Section>
      <Section size="md" title="Button with State (Extra large)" border={false}>
        <Text>
          Buttons can be in different states. Example shows button in{' '}
          <code>danger</code> state
        </Text>
        <DemoWidget name="Button" width={130} showCodeByDefault>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
