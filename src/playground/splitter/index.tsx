import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import Widgets from "./widgets";

function splitter() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      description="Splitter is a component that can be used to split the screen into two parts. It can be used to create a left and right panel."
      title="Splitter"
      data={[
        {
          name: "<em>direction</em>",
          description: "sets the direction of split 'horizontal' | 'vertical'",
          default: "horizontal",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>border</em>",
          description: "enables or disables the border",
          default: "False",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>minSplitWidth</em>",
          description: "Minimum split width",
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>maxSplitWidth</em>",
          description: "Maximum split width",
          default: "400",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>minSplitHeight</em>",
          description: "Minimum split height",
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>maxSplitHeight</em>",
          description: "Maximum split height",
          default: "200",
          optional: "Yes",
          type: "Number",
        },
      ]}
      demoWidget={<Widgets />}
    />
  );
}

export default splitter;
