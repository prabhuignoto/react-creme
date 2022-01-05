import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      title="Menu"
      description="Menu is a component that can be used to display a list of items. It can be docked to any target element and aligned to three supported positions: left, right, and center."
      data={[
        {
          name: "position",
          description: `Docking position of the menu. <br>
          <em>'left'</em> | <em>'center'</em> | <em>'right'</em>`,
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
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default menu;
