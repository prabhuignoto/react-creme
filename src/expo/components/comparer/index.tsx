import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function comparer() {
  return (
    <DemoPageRenderer
      title="Image Comparer"
      description="A Image comparer for comparing two images side by side."
      data={[
        {
          name: "direction",
          description: "The direction of the comparer",
          defaultValue: "horizontal",
          optional: "Yes",
          type: "string",
        },
        {
          name: "sourceOne",
          description: "Source of the first image. Should be a valid URL.",
          defaultValue: "",
          optional: "Yes",
          type: "string",
        },
        {
          name: "sourceTwo",
          description: "Source of the second image. Should be a valid URL.",
          defaultValue: "",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default comparer;
