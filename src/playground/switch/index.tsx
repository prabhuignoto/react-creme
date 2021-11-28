import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function switchComponent() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "label",
          description: `label for the switch`,
          default: `""`,
          optional: "Yes",
          typ: "String",
        },
        {
          name: "labelOutside",
          description: `places the label outside the switch container`,
          default: `False`,
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "disabled",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "focusable",
          description: `enables focus via keyboard`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "width",
          description: `minimum width of the component`,
          default: "50",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "size",
          description: `prop for setting the size. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "style",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
          type: "Object",
        },
        {
          name: "onChange",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["Switch", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default switchComponent;
