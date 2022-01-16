import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function skeleton() {
  return (
    <DemoPageRenderer
      title="Skeleton"
      description="Skeleton is a lightweight component that can be used to display a loading state."
      properties={[
        {
          default: "4",
          description: "Number of skeleton rows",
          name: "rows",
          optional: "Yes",
          type: "Number",
        },
        {
          default: "{}",
          description: `Custom style object`,
          name: "style",
          optional: "Yes",
          type: "Object",
        },
        {
          default: "30",
          description: "Height of each row",
          name: "rowHeight",
          optional: "Yes",
          type: "Number",
        },
        {
          default: "False",
          description: "Animate rows",
          name: "animate",
          optional: "Yes",
          type: "Boolean",
        },
        {
          default: "4",
          description: "Specifies the number of blocks",
          name: "blocks",
          optional: "Yes",
          type: "Number",
        },
        {
          default: "False",
          description: "Shows a circle for each block",
          name: "showCircle",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
      stackBlitzCodes={["react-ts-1jank5"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default skeleton;
