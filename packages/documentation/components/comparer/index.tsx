import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function comparer() {
  return (
    <DemoPageRenderer
      title="Image Comparer"
      description="Compare images side by side either horizontally or vertically."
      properties={[
        {
          defaultValue: "horizontal",
          description: "The direction of the comparer",
          name: "direction",
          optional: "Yes",
          type: "string",
        },
        {
          defaultValue: "",
          description: "Source of the first image. Should be a valid URL.",
          name: "sourceOne",
          optional: "Yes",
          type: "string",
        },
        {
          defaultValue: "",
          description: "Source of the second image. Should be a valid URL.",
          name: "sourceTwo",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-kgea3r"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default comparer;
