import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomSize,
  Default,
  SelectedIndex,
  Slash,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={450}>{Default}</DemoWidget>
      </Section>
      <Section title="Custom Icon - slash">
        <BlockQuote>
          The icon can be changed by setting the <code>icon</code> property to
          any of the values <code>slash</code> <code>arrow</code> or{' '}
          <code>chevron</code>.
        </BlockQuote>
        <DemoWidget width={450}>{Slash}</DemoWidget>
      </Section>
      <Section title="Custom Icon - arrow">
        <DemoWidget width={450}>{CustomIcon}</DemoWidget>
      </Section>
      <Section title="Custom Size - Medium">
        <BlockQuote>
          The size can be changed by setting the <code>size</code> property to{' '}
          <code>sm</code> <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget width={450}>{SelectedIndex}</DemoWidget>
      </Section>
      <Section title="Custom Size - Large">
        <DemoWidget width={400}>{CustomSize}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
