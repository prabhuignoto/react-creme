import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Checkbox Group"
      description="Checkbox group is a group of checkboxes that can be used to select multiple options."
      demoWidget={<Widgets />}
      data={[
        {
          name: "<em>options</em>",
          description: "Options to be displayed in the checkbox group.",
          default: "[]",
          optional: "Yes",
          type: "Array<Option>",
        },
        {
          name: "<em>noUniqueIds</em>",
          description:
            "If true, the checkbox group will not generate unique ids for each checkbox.",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>checkboxStyle</em>",
          description:
            "checkbox render style. <em>square</em> or <em>round</em>",
          default: "<em>square</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>onChange</em>",
          description:
            "Callback function to be called when the checkbox group changes.",
          default: "",
          optional: "Yes",
          type: "function",
        },
        {
          name: "<em>disabled</em>",
          description: "Disables the checkbox group",
          default: "<em>false</em>",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "<em>layout</em>",
          description:
            "layout of the checkbox group. <em>vertical</em> or <em>horizontal</em>",
          default: "<em>vertical</em>",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
