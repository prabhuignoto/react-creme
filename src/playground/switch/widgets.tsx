import React from "react";
import { BlockQuote, Section, Switch } from "../../components";

function widgets() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="rc-demo-widgets"
    >
      <Section title="Switch - default">
        <div style={{ width: "100px" }} className="rc-demo-widget">
          <Switch
            label="Settings"
            checked
            onChange={(val) => console.log(val)}
          />
        </div>
      </Section>
      <Section title="Switch with label outside">
        <BlockQuote>The label can be placed outside the switch.</BlockQuote>
        <div style={{ width: "150px" }} className="rc-demo-widget">
          <Switch label="Settings" labelOutside checked focusable={true} />
        </div>
      </Section>
      <Section title="Disabled">
        <BlockQuote>
          Use the disabled property to disable the switch.
        </BlockQuote>
        <div style={{ width: "100px" }} className="rc-demo-widget">
          <Switch label="setting" disabled />
        </div>
      </Section>
      <Section title="Large size">
        <BlockQuote>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </BlockQuote>
        <div style={{ width: "200px" }} className="rc-demo-widget">
          <Switch label="Are you authorized" size="md" />
        </div>
      </Section>
      <Section title="Extra large">
        <div style={{ width: "250px" }} className="rc-demo-widget">
          <Switch label="Show settings" size="lg" labelOutside />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
