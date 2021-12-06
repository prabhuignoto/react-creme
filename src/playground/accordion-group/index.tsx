import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      description={`An accordion group is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them.
      It is one of many ways you can expose content to users`}
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
      tabTitles={["Examples", "Properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordionGroup;
