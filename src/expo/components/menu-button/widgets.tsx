import React from "react";
import { Section } from "../../../components";
import { MenuButton } from "../../../components/menu-button/menu-button";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <MenuButton
            items={["save", "save as new", "discard"]}
            placeholder="Choose an option"
            width={150}
          />
        </DemoWidget>
      </Section>
      <Section title="Right to Left">
        <DemoWidget>
          <MenuButton
            items={["save", "save as new", "discard"]}
            placeholder="Choose an option"
            width={200}
            RTL
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
