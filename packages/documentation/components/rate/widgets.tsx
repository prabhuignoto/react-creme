import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Rating default">
        <DemoWidget>{Default}</DemoWidget>
      </Section>
      <Section title="Custom icon count">
        <BlockQuote>
          Use the <code>iconCount</code> prop to customize the number of icons.
          The example renders the component with 3 icons.
        </BlockQuote>
        <DemoWidget>{CustomIconCount}</DemoWidget>
      </Section>
      <Section title="Custom Icon">
        <BlockQuote>
          Customize the icon with the <code>icon</code> prop.
        </BlockQuote>
        <DemoWidget>{CustomIcon}</DemoWidget>
      </Section>
      <Section title="Custom size">
        <BlockQuote>
          Choose a custom size with the <code>size</code> prop. The prop value
          can be <code>sm</code>, <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget>{CustomSize}</DemoWidget>
      </Section>
      <Section title="Disabled state">
        <DemoWidget>{Disabled}</DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
