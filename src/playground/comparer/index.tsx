import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function comparer() {
  return (
    <DemoPageRenderer
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
          description: "The first source of the comparer",
          defaultValue: "",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>sourceTwo</em>",
          description: "The second source of the comparer",
          defaultValue: "",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["comparer", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default comparer;
