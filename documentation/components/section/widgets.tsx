import React from "react";
import { Section } from "../../../lib/components";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <DemoWidget fullWidth>
        <Section title="Default rendering">
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
      <DemoWidget fullWidth>
        <Section title="Right to Left" RTL>
          <p>lorem ipsum </p>
        </Section>
      </DemoWidget>
    </div>
  );
}

export default Widgets;
