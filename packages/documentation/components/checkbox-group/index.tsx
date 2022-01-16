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
          default: "",
          description:
            "Callback function to be called when the checkbox group changes.",
          name: "onChange",
          optional: "Yes",
          type: "function",
        },
      ]}
      properties={[
        {
          default: "[]",
          description: "Options to be displayed in the checkbox group.",
          name: "options",
          optional: "Yes",
          type: "Array<Option>",
        },
        {
          default: "false",
          description:
            "If true, the checkbox group will not generate unique ids for each checkbox.",
          name: "noUniqueIds",
          optional: "Yes",
          type: "boolean",
        },
        {
          default: "square",
          description:
            "checkbox render style. <em>square</em> or <em>round</em>",
          name: "checkboxStyle",
          optional: "Yes",
          type: "string",
        },
        {
          default: "false",
          description: "Disables the checkbox group",
          name: "disabled",
          optional: "Yes",
          type: "boolean",
        },
        {
          default: "vertical",
          description: "layout of the checkbox group. vertical or horizontal",
          name: "layout",
          optional: "Yes",
          type: "string",
        },
      ]}
      tabTitles={["Examples", "Properties", "Type definitions", "Stackblitz"]}
      stackBlitzCodes={["react-ts-npfjx5"]}
    ></DemoPageRenderer>
  );
}

export default index;
