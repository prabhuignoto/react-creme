import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function index() {
  return (
    <DemoPageRenderer
      title="Checkbox Group"
      description="Checkbox group is a group of checkboxes that can be used to select multiple options."
      demoWidget={lazy(() => import("./widgets"))}
      callbacks={[
        {
          name: "onChange",
          description:
            "Callback function to be called when the checkbox group changes.",
          default: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      properties={[
        {
          name: "options",
          description: "Options to be displayed in the checkbox group.",
          default: "[]",
          optional: "Yes",
          type: "Array<Option>",
        },
        {
          name: "noUniqueIds",
          description:
            "If true, the checkbox group will not generate unique ids for each checkbox.",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "checkboxStyle",
          description:
            "checkbox render style. <em>square</em> or <em>round</em>",
          default: "square",
          optional: "Yes",
          type: "string",
        },
        {
          name: "disabled",
          description: "Disables the checkbox group",
          default: "false",
          optional: "Yes",
          type: "boolean",
        },
        {
          name: "layout",
          description: "layout of the checkbox group. vertical or horizontal",
          default: "vertical",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
