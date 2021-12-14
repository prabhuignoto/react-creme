import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function skeleton() {
  return (
    <DemoPageRenderer
      title="Skeleton"
      description="Skeleton is a lightweight component that can be used to display a loading state."
      data={[
        {
          name: "rows",
          description: "number of rows",
          default: "4",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "style",
          description: `Custom style object`,
          default: "{}",
          type: "Object",
          optional: "Yes",
        },
        {
          name: "rowHeight",
          description: "height of each row",
          default: "30",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "animate",
          description: "animate rows",
          default: "False",
          type: "Boolean",
          optional: "Yes",
        },
        {
          name: "blocks",
          description: "sets the number of blocks",
          default: "4",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "showCircle",
          description: "shows a circle for each block",
          default: "False",
          type: "Boolean",
          optional: "Yes",
        },
      ]}
      tabTitles={["examples", "Properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default skeleton;
