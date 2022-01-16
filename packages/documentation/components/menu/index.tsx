import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function menu() {
  return (
    <DemoPageRenderer
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
      stackBlitzCodes={["react-ts-gxoozp"]}
      title="Menu"
      description="Menu is a component that can be used to display a list of items. It can be docked to any target element and aligned to three supported positions: left, right, and center."
      callbacks={[
        {
          default: "",
          description: `Callback fired when the menu is opened`,
          name: "onOpen",
          optional: "Yes",
          type: "Function",
        },
        {
          default: "",
          description: `Callback fired when the menu is closed`,
          name: "onClose",
          optional: "Yes",
          type: "Function",
        },
        {
          default: "",
          description: `Callback fired when a menu items is selected`,
          name: "onSelected",
          optional: "Yes",
          type: "Function",
        },
      ]}
      properties={[
        {
          default: "left",
          description: `Docking position of the menu. <br>
          <em>'left'</em> | <em>'right'</em>`,
          name: "align",
          optional: "Yes",
          type: "string",
        },
        {
          default: "[]",
          description: `Collection of Menu Items`,
          name: "items",
          optional: "Yes",
          type: "Array",
        },
        {
          default: "",
          description: `Any custom CSS`,
          name: "style",
          optional: "Yes",
          type: "Object",
        },
        {
          default: "True",
          description: `makes the component focusable via keyboard`,
          name: "focusable",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default menu;
