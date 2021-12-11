import React from "react";
import { Button, Section } from "../../components";
import { Menu } from "../../components/menu/menu";
import { CheckCircleIcon } from "../../icons";
import { DemoWidget } from "../common/demo-widget";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Menu attached to a Button">
        <DemoWidget>
          <div style={{ width: "100px" }}>
            <Menu
              position="right"
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
    </div>
  );
}

export default Widgets;
