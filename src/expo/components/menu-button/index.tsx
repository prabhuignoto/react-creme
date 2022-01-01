import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function menuButton() {
  return (
    <DemoPageRenderer
      title="Menu Button"
      description="MenuButton allows to choose an action from a list of actions"
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
        {
          name: "RTL",
          description: `Right to Left`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menuButton;
