import React from 'react';
import { BlockQuote, Section, Switch } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
function widgets() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="rc-demo-widgets"
    >
      <Section title="Switch - default">
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <Switch
              label="Settings"
              checked
              onChange={(val) => console.log(val)}
            />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Switch with label outside">
        <BlockQuote>The label can be placed outside the switch.</BlockQuote>
        <DemoWidget>
          <div style={{ width: '150px' }}>
            <Switch label="Settings" labelOutside focusable />
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
            <Switch label="Enable Setting" showCheckIcon checked />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Disabled">
        <BlockQuote>
          Use the disabled property to disable the switch.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: '100px' }}>
            <Switch label="setting" disabled />
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
            <Switch label="Are you authorized" size="md" />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Extra large">
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <Switch label="Show settings" size="lg" labelOutside />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
