import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function radioGroup() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="Radio Group"
      description="Radio group is a group of radio buttons."
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "layout",
          description: "layout of the radio group",
          default: "column",
          optional: "Yes",
          type: "String",
        },
        {
          name: "items",
          description: "items to be displayed in the radio group",
          default: "[]",
          optional: "Yes",
          type: "Array",
        },
        {
          name: "disabled",
          description: "disables the complete radio group",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "onSelected",
          description: "callback when a radio is selected",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "style",
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
