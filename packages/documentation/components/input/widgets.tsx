import React from "react";
import { BlockQuote, Input, Section } from "../../../lib/components";
import { ChevronRightIcon } from "../../../lib/icons";
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
            <Input enableClear focusable>
              <ChevronRightIcon />
            </Input>
          </div>
        </DemoWidget>
      </Section>
      <Section title="Input with border">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear border>
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
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear state="success"></Input>
          </div>
        </DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget>
          <div style={{ width: "200px" }}>
            <Input enableClear focusable RTL>
              <ChevronRightIcon />
            </Input>
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
