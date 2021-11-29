import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function menubar() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "align",
          description: `aligns the menubar items to 'left' or 'right`,
          default: "left",
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
          name: "width",
          description: `minimum width of the menu bar`,
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "onSelected",
          description: `callback fired when a menu item is selected`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["menu bar", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default menubar;
