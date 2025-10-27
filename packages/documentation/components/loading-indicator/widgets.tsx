import jsxToString from 'react-element-to-jsx-string';
import { BlockQuote, Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CircleShape,
  CustomSize,
  CustomSpeed,
  Default,
  FineGrainedSize,
  LoadingIndicatorCount,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Shape" border={false}>
        <Text>
          The shape of the loading indicator can be changed to circle by passing
          the
          <code>shape</code> prop with value <code>circle</code>. The default
          shape is square.
        </Text>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {CircleShape}
        </DemoWidget>
      </Section>
      <Section size="md" title="Speed" border={false}>
        <Text>
          The speed of the loading indicator can be changed by passing the
          <code>speed</code> prop with value <code>slow</code>,{' '}
          <code>normal</code> or <code>fast</code>. The default speed is normal.
        </Text>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom length" border={false}>
        <Text>
          The number of items in the loading indicator can be changed by passing
          the <code>count</code> prop with a number value. The default count is{' '}
          <code>3</code>.
        </Text>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {LoadingIndicatorCount}
        </DemoWidget>
      </Section>
      <Section size="md" title="Right to Left" border={false}>
        <Text>
          The loading indicator can be displayed from right to left by passing
          the <code>rtl</code>. The default direction is left to right.
        </Text>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Size" border={false}>
        <Text>
          Customize the size of the loading indicator by passing the{' '}
          <code>size</code> prop with value <code>sm</code>, <code>md</code> or{' '}
          <code>lg</code>. The default size is <code>sm</code>.
        </Text>
        <BlockQuote>
          The sizes can be managed by adjusting the iconSizes settings in the
          ThemeProvider
        </BlockQuote>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {CustomSize}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom size" border={false}>
        <Text>
          If you want to take complete control over the size of the loading
          indicator, you can pass the <code>customSize</code> prop with a number
          value (pixels). This will override the <code>size</code> prop.
        </Text>
        <DemoWidget
          name="LoadingIndicator"
          width={200}
          style={{ marginLeft: '2rem' }}
        >
          {FineGrainedSize}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
