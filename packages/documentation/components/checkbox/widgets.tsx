import React from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, CheckBox, Section } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const media = useRecoilValue(responsiveState);
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <div style={{ width: "250px" }}>
            <CheckBox
              label="Choose your preferred option"
              onChange={(ele) => console.log(ele)}
              focusIcon
            />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Disabled State">
        <DemoWidget>
          <div style={{ width: "250px" }}>
            <CheckBox
              label="This option is disabled"
              onChange={(ele) => console.log(ele)}
              border={false}
              disabled
            />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Large size">
        <BlockQuote>Comes in three sizes: small, medium, large.</BlockQuote>
        <DemoWidget>
          <div style={{ width: "250px" }}>
            <CheckBox
              label="Choose this option"
              onChange={(ele) => console.log(ele)}
              isChecked
              size="lg"
              border={false}
              focusable
            />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Custom Checkbox style">
        <DemoWidget>
          <div style={{ width: "250px" }}>
            <CheckBox
              onChange={(ele) => console.log(ele)}
              label="Choose this option"
              focusIcon
              checkBoxStyle="round"
              isChecked
            />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
