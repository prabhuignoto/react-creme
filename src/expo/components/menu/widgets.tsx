import React from "react";
import { BlockQuote, Button, Menu, Section } from "../../../components";
import { CheckCircleIcon } from "../../../icons";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Menu attached to a Button">
        <BlockQuote>
          The example below shows a menu attached to a button.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "100px" }}>
            <Menu
              position="left"
              items={[
                { name: "Open" },
                { name: "Save As" },
                { name: "Close" },
                { name: "Exit" },
              ]}
              focusable={false}
            >
              <Button label="File"></Button>
            </Menu>
          </div>
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a Icon">
        <BlockQuote>
          Menus can be docked and aligned to three supported positions: left,
          right, and center. The example below shows a menu docked and aligned
          to the center of the icon.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "100px" }}>
            <Menu
              items={[
                { name: "Open" },
                { name: "Save As" },
                { name: "Close" },
                { name: "Exit" },
              ]}
              position="center"
              focusable={false}
            >
              <Button type="icon" size="lg">
                <CheckCircleIcon />
              </Button>
            </Menu>
          </div>
        </DemoWidget>
      </Section>
      <Section title="Menu attached to a native Element">
        <BlockQuote>
          The example below shows a menu attached to a native element (button).
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "100px" }}>
            <Menu
              position="left"
              items={[
                { name: "Open" },
                { name: "Save As" },
                { name: "Close" },
                { name: "Exit" },
              ]}
              focusable={false}
            >
              <input type="button" value="File" />
            </Menu>
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
