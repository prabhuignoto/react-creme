import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widget } from "./drawer-widgets";

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={["drawer", "properties"]}
      data={[
        {
          name: "<em>position</em>",
          description:
            "docking position of the drawer. 'left' | 'right' | 'top' | 'bottom'",
          default: "<em>left</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>height</em>",
          description: "custom height to be used when docked to top or bottom",
          default: "<em>300</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>width</em>",
          description: "custom width to be used when docked to left or right",
          default: "<em>300</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>transition</em>",
          description: "custom transition for custom animation",
          default: "<em>cubic-bezier(0.79, 0.14, 0.15, 0.86)</em>",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={<Widget />}
    ></DemoPageRenderer>
  );
}

export default drawer;
