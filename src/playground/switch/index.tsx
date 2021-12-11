import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import Widgets from "./widgets";

function switchComponent() {
  return (
    <DemoPageRenderer
      title="Switch"
      description={`Toggle switch (known as “toggles”) is a UI control that has two mutually-exclusive states, such as ON and OFF.
      The design and functionality of this control is based on a physical switch that allows users to turn things ON or OFF`}
      data={[
        {
          name: "<em>label</em>",
          description: `label for the switch`,
          default: `""`,
          optional: "Yes",
          typ: "String",
        },
        {
          name: "<em>labelOutside</em>",
          description: `places the label outside the switch container`,
          default: `False`,
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>disabled</em>",
          description: `disables the button`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>focusable</em>",
          description: `enables focus via keyboard`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>width</em>",
          description: `minimum width of the component`,
          default: "50",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>size</em>",
          description: `prop for setting the size. <br> <code>"sm" | "md" | "lg"</code>`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>style</em>",
          description: `custom CSS that will be applied to the container of the component`,
          default: `{}`,
          optional: "Yes",
          type: "Object",
        },
        {
          name: "<em>onChange</em>",
          description: `callback fired on state change`,
          default: ``,
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default switchComponent;
