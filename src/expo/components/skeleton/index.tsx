import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function skeleton() {
  return (
    <DemoPageRenderer
      title="Skeleton"
      description="Skeleton is a lightweight component that can be used to display a loading state."
      data={[
        {
          name: "rows",
          description: "Number of skeleton rows",
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
          description: "Height of each row",
          default: "30",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "animate",
          description: "Animate rows",
          default: "False",
          type: "Boolean",
          optional: "Yes",
        },
        {
          name: "blocks",
          description: "Specifies the number of blocks",
          default: "4",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "showCircle",
          description: "Shows a circle for each block",
          default: "False",
          type: "Boolean",
          optional: "Yes",
        },
      ]}
      tabTitles={["examples", "Properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default skeleton;
