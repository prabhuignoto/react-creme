import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function tree() {
  return (
    <DemoPageRenderer
      title="Tree"
      description="Tree is a component that displays a hierarchical data structure with expandable/collapsible nodes."
      properties={[
        {
          name: "height",
          description: "The height of the tree",
          defaultValue: "200",
          optional: "Yes",
          type: "number",
        },
        {
          name: "width",
          description: "The width of the tree",
          defaultValue: "100",
          optional: "Yes",
          type: "number",
        },
        {
          name: "items",
          description: "The items to display in the tree",
          defaultValue: "[]",
          optional: "Yes",
          type: "array",
        },
        {
          name: "allowSelection",
          description: "Whether or not to allow selection",
          defaultValue: "true",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "onChange",
          description: "Callback for when the selection changes",
          defaultValue: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default tree;
