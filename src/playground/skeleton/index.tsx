import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function skeleton() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>rows</em>",
          description: "number of rows",
          default: "<em>4</em>",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "<em>style</em>",
          description: `Custom style object`,
          default: "<em>{}</em>",
          type: "Object",
          optional: "Yes",
        },
        {
          name: "<em>rowHeight</em>",
          description: "height of each row",
          default: "<em>30</em>",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "<em>animate</em>",
          description: "animate rows",
          default: "<em>False</em>",
          type: "Boolean",
          optional: "Yes",
        },
        {
          name: "<em>blocks</em>",
          description: "sets the number of blocks",
          default: "<em>4</em>",
          type: "Number",
          optional: "Yes",
        },
        {
          name: "<em>showCircle</em>",
          description: "shows a circle for each block",
          default: "<em>False</em>",
          type: "Boolean",
          optional: "Yes",
        },
      ]}
      tabTitles={["Skeleton", "Properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default skeleton;