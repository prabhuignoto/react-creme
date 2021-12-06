import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Radio Group"
      description="Radio group is a group of radio buttons."
      tabTitles={["Radio Group", "properties"]}
      data={[
        {
          name: "<em>layout</em>",
          description: "layout of the radio group",
          default: "column",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>items</em>",
          description: "items to be displayed in the radio group",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "<em>disabled</em>",
          description: "disables the complete radio group",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>onSelected</em>",
          description: "callback when a radio is selected",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>style</em>",
          description: "style object",
          default: "{}",
          optional: "Yes",
          type: "Object",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default radioGroup;
