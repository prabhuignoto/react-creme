import React from "react";
import { Button } from "../../components";
import { Menu } from "../../components/menu/menu";
import { CheckCircleIcon } from "../../icons";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <div className="r-demo-widget">
        <Menu
          position="right"
          items={[
            { name: "prabhu" },
            { name: "tester", disabled: true },
            { name: "tester 2" },
            { name: "tester 3" },
          ]}
          focusable={false}
        >
          <Button label="Menu"></Button>
        </Menu>
      </div>
      <div className="rc-demo-widget">
        <Menu
          items={[
            { name: "prabhu" },
            { name: "tester" },
            { name: "tester 2" },
            { name: "tester 3" },
          ]}
          position="center"
          focusable={false}
        >
          <Button type="icon" size="lg">
            <CheckCircleIcon />
          </Button>
        </Menu>
      </div>
    </div>
  );
}

export default Widgets;
