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
        <DemoWidget>
          <Default />
        </DemoWidget>
      </Section>
      <Section title="Custom icon count">
        <BlockQuote>You can choose the number of icons to display.</BlockQuote>
        <DemoWidget>
          <CustomIconCount />
        </DemoWidget>
      </Section>
      <Section title="Custom Icon">
        <BlockQuote>You can set the custom icon.</BlockQuote>
        <DemoWidget>
          <CustomIcon />
        </DemoWidget>
      </Section>
      <Section title="Custom size">
        <BlockQuote>The size of the icon can be customized too</BlockQuote>
        <DemoWidget>
          <CustomSize />
        </DemoWidget>
      </Section>
      <Section title="Disabled state">
        <DemoWidget>
          <Disabled />
        </DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget>
          <RTL />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
