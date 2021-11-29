import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function buttons() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "label",
          description: "Label of the button",
          default: `""`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "type",
          description: `configures the type of button. <br> <code>"primary" | "default" | "danger" | "icon" | "progress"</code>`,
          default: "default",
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
          description: `Custom style object`,
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
      ]}
      tabTitles={["buttons", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default buttons;
