import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function switchComponent() {
  return (
    <DemoPageRenderer
      title="Switch"
      description={`Toggle switch (known as “toggles”) is a UI control that has two mutually-exclusive states, such as ON and OFF.
      The design and functionality of this control is based on a physical switch that allows users to turn things ON or OFF`}
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
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default switchComponent;
