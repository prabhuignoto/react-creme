import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function accordion() {
  return (
    <DemoPageRenderer
      title="Accordion"
      description="Accordion is a collapsible component that can be used to hide or expose collapsible content."
      tabTitles={["Examples", "Properties"]}
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
          name: "title",
          description: "Title of the accordion",
          default: "''",
          optional: "Yes",
          type: "String",
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
          default: "cubic-bezier(0.19, 1, 0.22, 1)",
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
        {
          name: "focusable",
          description: "enables focus outlines",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "titleColor",
          description: "color of the title",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
        {
          name: "iconColor",
          description: "color of the icon",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default accordion;
