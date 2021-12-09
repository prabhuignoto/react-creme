import React from "react";
import { MenuButton } from "../components/menu-button/menu-button";
import DemoPageRenderer from "./demo-page-renderer";

function menuButton() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "placeholder",
          description: `placeholder text for the button`,
          default: "choose an option",
          optional: "Yes",
          type: "String",
        },
        {
          name: "items",
          description: `Collection of Menu Items`,
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "position",
          description: `Docking position of the menu. <br> <code>'left' | 'center' | 'right'</code>`,
          default: "left",
          optional: "Yes",
          type: "String",
        },
        {
          name: "onSelected",
          description: `Callback fired when a menu items is selected`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "width",
          description: `minimum width of the menu button`,
          default: "150",
          optional: "Yes",
          type: "Number",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div className="rc-demo-widget">
            <MenuButton
              items={["save", "cancel", "delete"]}
              placeholder="Choose an option"
              position="right"
              width={150}
            />
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default menuButton;
