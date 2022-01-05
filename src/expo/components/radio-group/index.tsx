import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import("./widgets"))}
      title="Radio Group"
      description="Radio group is a group of radio buttons."
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "layout",
          description: "Layout of the radio group",
          default: "column",
          optional: "Yes",
          type: "String",
        },
        {
          name: "items",
          description: "Collection of Options",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "disabled",
          description: "Disables the complete radio group",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "onSelected",
          description:
            "Callback function to be executed when an option is selected",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "style",
          description: "Custom Style object",
          default: "{}",
          optional: "Yes",
          type: "Object",
        },
      ]}
    ></DemoPageRenderer>
  );
}

export default radioGroup;
