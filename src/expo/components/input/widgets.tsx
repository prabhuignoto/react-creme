import React from "react";
import { Section, Input, BlockQuote } from "../../../components";
import { ChevronRightIcon } from "../../../icons";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear></Input>
          </div>
        </DemoWidget>
      </Section>
      <Section title="Input with a custom Icon">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear>
              <ChevronRightIcon />
            </Input>
          </div>
        </DemoWidget>
      </Section>
      <Section title="States">
        <BlockQuote>
          Inputs can be configured to have different states. The example below
          shows input in error and success state
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear state="error"></Input>
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
