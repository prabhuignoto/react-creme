import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function menubar() {
  return (
    <DemoPageRenderer
      title="Menubar"
      description="Menubar is a component that can be used to display a menu bar on top of the application."
      data={[
        {
          name: "align",
          description: `Aligns the menubar items to <em>left</em>' or <em>right</em>`,
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
          description: `Minimum width of the menu bar`,
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "onSelected",
          description: `Callback fired when a menu item is selected`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default menubar;
