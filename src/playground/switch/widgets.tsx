import React from "react";
import { Section, Switch } from "../../components";

function widgets() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="rc-demo-widgets"
    >
      <Section title="Switch - default">
        <div style={{ width: "100px" }} className="rc-demo-widget">
          <Switch label="Settings" checked />
        </div>
      </Section>
      <Section title="Switch with label outside">
        <div style={{ width: "150px" }} className="rc-demo-widget">
          <Switch label="Settings" labelOutside checked focusable={false} />
        </div>
      </Section>
      <Section title="Disabled">
        <div style={{ width: "100px" }} className="rc-demo-widget">
          <Switch label="setting" disabled />
        </div>
      </Section>
      <Section title="Large size">
        <div style={{ width: "200px" }} className="rc-demo-widget">
          <Switch label="Are you authorized" size="md" />
        </div>
      </Section>
      <Section title="Extra large">
        <div style={{ width: "250px" }} className="rc-demo-widget">
          <Switch label="Mookupodi" size="lg" labelOutside />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
