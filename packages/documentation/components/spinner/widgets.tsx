import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomSpeed, Default, Large, Medium } from './widget-variants';

const Widgets = () => {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="Spinner" width={200} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Speed">
        <Text>
          The speed of the spinner can be adjusted through the{' '}
          <code>speed</code> prop.
        </Text>
        <DemoWidget name="Spinner" width={200} showCodeByDefault>
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom sizes">
        <Text>
          Three different sizes are available for the spinner. <code>sm</code>,{' '}
          <code>md</code> and <code>lg</code>.
        </Text>
        <DemoWidget name="Spinner" width={200} showCodeByDefault>
          {Default}
        </DemoWidget>
        <DemoWidget name="Spinner" width={200} showCodeByDefault>
          {Medium}
        </DemoWidget>
        <DemoWidget name="Spinner" width={200} showCodeByDefault>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
};

export default Widgets;
