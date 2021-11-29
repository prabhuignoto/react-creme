import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function checkbox() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "label",
          description: `label for the checkbox`,
          default: `""`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "size",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "style",
          description: `any custom CSS`,
          default: "{}",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "focusable",
          description: `makes the component focusable via keyboard`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "border",
          description: `prop for disabling the button border`,
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "isChecked",
          description: `prop to set the checkbox to checked state on load`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "onChange",
          description: `Callback fired when the state changes`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["checkbox", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default checkbox;
