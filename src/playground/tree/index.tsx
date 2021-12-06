import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function tree() {
  return (
    <DemoPageRenderer
      title="Tree"
      description="Tree is a component that displays a hierarchical data structure with expandable/collapsible nodes."
      data={[
        {
          name: "<em>height</em>",
          description: "The height of the tree",
          defaultValue: "<em>200</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>width</em>",
          description: "The width of the tree",
          defaultValue: "<em>100</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>items</em>",
          description: "The items to display in the tree",
          defaultValue: "<em>[]</em>",
          optional: "Yes",
          type: "array",
        },
        {
          name: "<em>allowSelection</em>",
          description: "Whether or not to allow selection",
          defaultValue: "<em>true</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>onChange</em>",
          description: "Callback for when the selection changes",
          defaultValue: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tree;
