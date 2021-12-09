import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function accordion() {
  return (
    <DemoPageRenderer
      title="Accordion"
      description="Accordion is a collapsible component that can be used to hide or expose collapsible content."
      tabTitles={["Examples", "Properties"]}
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
          name: "<em>title</em>",
          description: "Title of the accordion",
          default: "<em>''</em>",
          optional: "Yes",
          type: "String",
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
          default: "<em>cubic-bezier(0.19, 1, 0.22, 1)</em>",
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
        {
          name: "<em>focusable</em>",
          description: "enables focus outlines",
          default: "false",
          optional: "Yes",
          type: "<em>Boolean</em>",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordion;
