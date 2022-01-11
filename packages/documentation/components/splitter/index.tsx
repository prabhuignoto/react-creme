import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function splitter() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      description="Splitter is a component that can be used to split the screen into two parts. It can be used to create a left and right panel."
      title="Splitter"
      properties={[
        {
          name: "direction",
          description:
            "sets the direction of split <em>horizontal</em> | <em>vertical</em>",
          default: "horizontal",
          optional: "Yes",
          type: "String",
        },
        {
          name: "border",
          description: "enables or disables the border",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "minSplitWidth",
          description: "Minimum split width",
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "maxSplitWidth",
          description: "Maximum split width",
          default: "400",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "minSplitHeight",
          description: "Minimum split height",
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "maxSplitHeight",
          description: "Maximum split height",
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "handleBarWidth",
          description: "width of the drag handle bar",
          default: "6",
          optional: "Yes",
          type: "Number",
        },
      ]}
      demoWidget={lazy(() => import("./widgets"))}
    />
  );
}

export default splitter;
