import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function buttons() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>label</em>",
          description: "Label of the button",
          default: `<em>""</em>`,
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>type</em>",
          description: `configures the type of button. <br> <code>"primary" | "default" | "danger" | "icon" | "progress"</code>`,
          default: "<em>default</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>disabled</em>",
          description: `disables the button`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>size</em>",
          description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "<em>sm</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>style</em>",
          description: `Custom style object`,
          default: "<em>{}</em>",
          optional: "Yes",
          type: "Object",
        },
        {
          name: "<em>focusable</em>",
          description: `makes the component focusable via keyboard`,
          default: "<em>False</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>border</em>",
          description: `prop for disabling the button border`,
          default: "<em>true</em>",
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
