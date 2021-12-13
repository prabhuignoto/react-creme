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
          name: "<em>direction</em>",
          description: "The direction of the comparer",
          defaultValue: "<em>horizontal</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>sourceOne</em>",
          description: "Source of the first image. Should be a valid URL.",
          defaultValue: "",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>sourceTwo</em>",
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
