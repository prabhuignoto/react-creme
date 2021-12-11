import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import Widgets from "./widgets";

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "<em>position</em>",
          description: `Docking position of the menu. <br> <code>'left' | 'center' | 'right'</code>`,
          default: "left",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>items</em>",
          description: `Collection of Menu Items`,
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>onOpen</em>",
          description: `Callback fired when the menu is opened`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>onClose</em>",
          description: `Callback fired when the menu is closed`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>onSelected</em>",
          description: `Callback fired when a menu items is selected`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>style</em>",
          description: `Any custom CSS`,
          default: "",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "<em>focusable</em>",
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
