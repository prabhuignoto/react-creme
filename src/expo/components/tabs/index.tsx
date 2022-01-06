import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function tabs() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      title="Tabs"
      description="Tabs are used to group and organize content. They can be used to switch between views or to navigate between pages in a document."
      properties={[
        {
          name: "tabStyle",
          description: "sets the tab style. <em>flat</em> | <em>rounded</em>",
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
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default tabs;
