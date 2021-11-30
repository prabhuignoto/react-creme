import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function accordion() {
  return (
    <DemoPageRenderer
      tabTitles={["Accordion", "Properties"]}
      data={[
        {
          name: "<em>id</em>",
          description: "unique id for the accordion",
          default: "<em>auto generated</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>alignIconRight</em>",
          description: "Aligns the expand/collapse icon to the Right.",
          default: "<em>false</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>iconType</em>",
          description: `prop to change the icon type. <br> <code>"chevron" | "plus"</code>`,
          default: "<em>chevron</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>noBorder</em>",
          description: "Disables the border around the accordion item",
          default: "<em>false</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>transition</em>",
          description: "custom transition function",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>onCollapsed</em>",
          description: "callback that is called on collapse",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>onExpanded</em>",
          description: "callback that is called on expand",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordion;
