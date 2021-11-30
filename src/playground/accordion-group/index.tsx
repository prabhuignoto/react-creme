import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function accordionGroup() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>alignIconRight</em>",
          description: "aligns the chevron icon to the right",
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>border</em>",
          description: "prop to set the border for the component",
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>titles</em>",
          description: "prop to set the title for each accordion group",
          default: "<em>[]</em>",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>initialState</em>",
          description: `initial state of all the accordion groups. <br> <code>"close" | "open"</code>`,
          default: "<em>close</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>autoClose</em>",
          description: `prop to auto close other groups when a group is open`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["Accordion Group", "Properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
