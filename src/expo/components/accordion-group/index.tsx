import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function accordionGroup() {
  return (
    <DemoPageRenderer
      title="Accordion Group"
      description={`An accordion group is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them.
      It is one of many ways you can expose content to users`}
      data={[
        {
          name: "alignIconRight",
          description: "aligns the chevron icon to the right",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "border",
          description: "prop to set the border for the component",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "titles",
          description: "prop to set the title for each accordion group",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "initialState",
          description: `initial state of all the accordion groups. <br> <code>"close" | "open"</code>`,
          default: "close",
          optional: "Yes",
          type: "String",
        },
        {
          name: "autoClose",
          description: `prop to auto close other groups when a group is open`,
          default: "False",
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
