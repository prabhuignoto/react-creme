import React from "react";
import { Button, Menu } from "../components";
import { CheckCircleIcon } from "../icons";
import DemoPageRenderer from "./demo-page-renderer";

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={["menu", "properties"]}
      data={[
        {
          name: "position",
          description: `Docking position of the menu. <br> <code>'left' | 'center' | 'right'</code>`,
          default: "left",
          optional: "Yes",
        },
        {
          name: "items",
          description: `Collection of Menu Items`,
          default: "[]",
          optional: "Yes",
        },
        {
          name: "onOpen",
          description: `Callback fired when the menu is opened`,
          default: "",
          optional: "Yes",
        },
        {
          name: "onClose",
          description: `Callback fired when the menu is closed`,
          default: "",
          optional: "Yes",
        },
        {
          name: "onSelected",
          description: `Callback fired when a menu items is selected`,
          default: "",
          optional: "Yes",
        },
        {
          name: "style",
          description: `Any custom CSS`,
          default: "",
          optional: "Yes",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "",
          optional: "Yes",
        },
      ]}
      demoWidget={
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
      }
    ></DemoPageRenderer>
  );
}

export default menu;
