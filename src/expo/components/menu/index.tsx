import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "position",
          description: `Docking position of the menu. <br> <code>'left' | 'center' | 'right'</code>`,
          default: "left",
          optional: "Yes",
          type: "string",
        },
        {
          name: "items",
          description: `Collection of Menu Items`,
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "onOpen",
          description: `Callback fired when the menu is opened`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "onClose",
          description: `Callback fired when the menu is closed`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "onSelected",
          description: `Callback fired when a menu items is selected`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "style",
          description: `Any custom CSS`,
          default: "",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "True",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menu;
