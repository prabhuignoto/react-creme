import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CheckIcon,
  Default,
  Disabled,
  ExtraLarge,
  LabelOutside,
  Large,
} from './widget-variants';

function widgets() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="rc-demo-widgets"
    >
      <Section title="Switch - default">
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <Default />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Switch with label outside">
        <BlockQuote>The label can be placed outside the switch.</BlockQuote>
        <DemoWidget>
          <div style={{ width: '150px' }}>
            <LabelOutside />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Switch with Check status">
        <BlockQuote>
          Use <code>showCheckIcon</code> property to display a check icon inside
          the toggle control.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '130px' }}>
            <CheckIcon />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Disabled">
        <BlockQuote>
          Use the disabled property to disable the switch.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <Disabled />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Large size">
        <BlockQuote>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '200px' }}>
            <Large />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Extra large">
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <ExtraLarge />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
