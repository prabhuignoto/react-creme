import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import { Widgets } from "./tooltip-widgets";

function tooltip() {
  return (
    <DemoPageRenderer
      title="Tooltip"
      description="Tooltip is a small overlay that displays a message when a user hovers over an element."
      data={[
        {
          name: "position",
          description:
            "docking position of the tooltip. <br> <code>'top left' | 'top center' | 'top right'</code>",
          default: "bottom center",
          optional: "Yes",
          type: "String",
        },
        {
          name: "width",
          description: "minimum width of the tooltip",
          default: "150",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "message",
          description: "message to be displayed inside the tooltip",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "onTooltipRendered",
          description: "callback invoked on tooltip render",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "isStatic",
          description: `By default the tooltip is shown on hover.
            This can be overridden by setting <code>isStatic</code>. When true the popup is always shown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "bgColor",
          description: "background color of the tooltip",
          default: "#fff",
          optional: "Yes",
          type: "String",
        },
        {
          name: "foreColor",
          description: "foreground color of the tooltip",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tooltip;
