import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function tabs() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      title="Tabs"
      description="Tabs are used to group and organize content. They can be used to switch between views or to navigate between pages in a document."
      data={[
        {
          name: "<em>tabStyle</em>",
          description: "sets the tab style. 'flat' | 'rounded'",
          default: "<em>flat</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>border</em>",
          description: "enables or disables the border",
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>labels</em>",
          description: "sets the label for each tab",
          default: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>disabledTabs</em>",
          description: "prop to disable set of tabs",
          default: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>style</em>",
          description: "Sets any custom CSS",
          default: "<em>{}</em>",
          optional: "Yes",
          type: "Object",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tabs;
