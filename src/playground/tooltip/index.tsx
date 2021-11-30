import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widgets } from "./tooltip-widgets";

function tooltip() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>position</em>",
          description:
            "docking position of the tooltip. <br> <code>'top left' | 'top center' | 'top right'</code>",
          default: "<em>bottom center</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>width</em>",
          description: "minimum width of the tooltip",
          default: "<em>150</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>message</em>",
          description: "message to be displayed inside the tooltip",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "<em>onTooltipRendered</em>",
          description: "callback invoked on tooltip render",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>isStatic</em>",
          description: `By default the tooltip is shown on hove</em>r.
            This can be overridden by setting isStatic. When true the popup is always shown`,
          default: "<em>False</em>",
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
