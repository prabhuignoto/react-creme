import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widget } from "./drawer-widgets";

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={["drawer", "properties"]}
      data={[
        {
          name: "position",
          description:
            "docking position of the drawer. 'left' | 'right' | 'top' | 'bottom'",
          default: "left",
          optional: "Yes",
        },
        {
          name: "height",
          description: "custom height to be used when docked to top or bottom",
          default: "300",
          optional: "Yes",
        },
        {
          name: "width",
          description: "custom width to be used when docked to left or right",
          default: "300",
          optional: "Yes",
        },
        {
          name: "transition",
          description: "custom transition for custom animation",
          default: "cubic-bezier(0.79, 0.14, 0.15, 0.86)",
          optional: "Yes",
        },
      ]}
      demoWidget={<Widget />}
    ></DemoPageRenderer>
  );
}

export default drawer;
