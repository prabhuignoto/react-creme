import React from "react";
import { Button, Section } from "../../components";
import { Menu } from "../../components/menu/menu";
import { CheckCircleIcon } from "../../icons";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="">
        <div className="rc-demo-widget">
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
      </Section>
      <Section title="">
        <div className="rc-demo-widget">
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
      </Section>
    </div>
  );
}

export default Widgets;
