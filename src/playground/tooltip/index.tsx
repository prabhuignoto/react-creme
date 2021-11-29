import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widgets } from "./tooltip-widgets";

function tooltip() {
  return (
    <DemoPageRenderer
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
            This can be overridden by setting isStatic. When true the popup is always shown`,
          default: "",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["tooltip", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tooltip;
