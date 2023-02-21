import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomSpeed, Default, RTL, SquareShape } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom shape">
        <Text>
          The shape of the loading indicator can be changed to circle by passing
          the
          <code>shape</code> prop with value <code>circle</code>. The default
          shape is square.
        </Text>
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {SquareShape}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Speed">
        <Text>
          The speed of the loading indicator can be changed by passing the
          <code>speed</code> prop with value <code>slow</code>,{' '}
          <code>normal</code> or <code>fast</code>. The default speed is normal.
        </Text>
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section size="md" title="Right to Left">
        <Text>
          The loading indicator can be displayed from right to left by passing
          the <code>rtl</code> prop with value <code>true</code>. The default
          direction is left to right.
        </Text>
        <DemoWidget
          name="Menu"
          width={200}
          style={{ marginLeft: '2rem' }}
          showCodeByDefault
        >
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
