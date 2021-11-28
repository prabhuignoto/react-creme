import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function accordion() {
  return (
    <DemoPageRenderer
      tabTitles={["Accordion", "Properties"]}
      data={[
        {
          name: "id",
          description: "unique id for the accordion",
          default: "auto generated",
          optional: "Yes",
          type: "String",
        },
        {
          name: "alignIconRight",
          description: "Aligns the expand/collapse icon to the Right.",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "iconType",
          description: `prop to change the icon type. <br> <code>"chevron" | "plus"</code>`,
          default: "chevron",
          optional: "Yes",
          type: "String",
        },
        {
          name: "noBorder",
          description: "Disables the border around the accordion item",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "transition",
          description: "custom transition function",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "onCollapsed",
          description: "callback that is called on collapse",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "onExpanded",
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
