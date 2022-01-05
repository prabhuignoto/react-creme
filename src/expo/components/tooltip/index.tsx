import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function tooltip() {
  return (
    <DemoPageRenderer
      title="Tooltip"
      description="Tooltip is a small overlay that displays a message when a user hovers over an element."
      data={[
        {
          name: "position",
          description: `Docking position of the tooltip.
          <br> <em>'top left'</em> | <em>top center</em> |
          <em>top right</em> <em>'bottom left'</em> | <em>bottom center</em> | <em>bottom right</em>`,
          default: "bottom center",
          optional: "Yes",
          type: "String",
        },
        {
          name: "width",
          description: "Minimum width of the tooltip",
          default: "150",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "message",
          description: "Message to be displayed inside the tooltip",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "onTooltipRendered",
          description: "Callback invoked on tooltip render",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "isStatic",
          description: `By default the tooltip is shown on hover.
            This can be overridden by setting <em>isStatic</em>. When true the popup is always shown`,
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "bgColor",
          description: "Background color of the tooltip",
          default: "#fff",
          optional: "Yes",
          type: "String",
        },
        {
          name: "foreColor",
          description: "Foreground color of the tooltip",
          default: "#000",
          optional: "Yes",
          type: "String",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./tooltip-widgets"))}
    ></DemoPageRenderer>
  );
}

export default tooltip;
