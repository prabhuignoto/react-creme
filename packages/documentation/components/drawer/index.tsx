import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function drawer() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-jngeyv"]}
      title="Drawer"
      description={`Drawer is a container that can be opened and closed and can be docked to any side of the screen.
       It can be used as a navigation drawer or a side drawer.`}
      properties={[
        {
          name: "position",
          description:
            "docking position of the drawer. <em>'left'</em> | <em>'right'</em> | <em>'top'</em> | <em>'bottom'</em>",
          default: "left",
          optional: "Yes",
          type: "String",
        },
        {
          name: "height",
          description: "custom height to be used when docked to top or bottom",
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "width",
          description: "custom width to be used when docked to left or right",
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "transition",
          description: "custom transition for custom animation",
          default: "cubic-bezier(0.79, 0.14, 0.15, 0.86",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={lazy(() => import("./drawer-widgets"))}
    ></DemoPageRenderer>
  );
}

export default drawer;
