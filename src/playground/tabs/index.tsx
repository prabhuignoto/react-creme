import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function tabs() {
  return (
    <DemoPageRenderer
      tabTitles={["Tabs", "properties"]}
      data={[
        {
          name: "tabStyle",
          description: "sets the tab style. 'flat' | 'rounded'",
          default: "flat",
          optional: "Yes",
          type: "String",
        },
        {
          name: "border",
          description: "enables or disables the border",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "labels",
          description: "sets the label for each tab",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "disabledTabs",
          description: "prop to disable set of tabs",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "style",
          description: "Sets any custom CSS",
          default: "{}",
          optional: "Yes",
          type: "Object",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tabs;
