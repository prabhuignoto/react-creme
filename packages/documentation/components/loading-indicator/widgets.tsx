import { BlockQuote, Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CircleShape,
  CustomSize,
  CustomSpeed,
  Default,
  FineGrainedSize,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
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
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
          {CircleShape}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Speed">
        <Text>
          The speed of the loading indicator can be changed by passing the
          <code>speed</code> prop with value <code>slow</code>,{' '}
          <code>normal</code> or <code>fast</code>. The default speed is normal.
        </Text>
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section size="md" title="Right to Left">
        <Text>
          The loading indicator can be displayed from right to left by passing
          the <code>rtl</code> prop with value <code>true</code>. The default
          direction is left to right.
        </Text>
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Size">
        <Text>
          Customize the size of the loading indicator by passing the{' '}
          <code>size</code> prop with value <code>sm</code>, <code>md</code> or{' '}
          <code>lg</code>. The default size is <code>md</code>.
        </Text>
        <BlockQuote>
          The sizes can be managed by adjusting the iconSizes settings in the
          ThemeProvider
        </BlockQuote>
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
          {CustomSize}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom size">
        <DemoWidget name="Menu" width={200} style={{ marginLeft: '2rem' }}>
          {FineGrainedSize}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
