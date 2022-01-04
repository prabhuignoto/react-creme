import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function buttons() {
  return (
    <DemoPageRenderer
      title="Buttons"
      description="Buttons are used to perform an action. They can be used in different contexts, such as primary, secondary, danger, or warning."
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
          description: `prop for enabling or disabling the button border`,
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default buttons;
