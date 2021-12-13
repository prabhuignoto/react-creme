import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function progress() {
  return (
    <DemoPageRenderer
      title="Progress"
      description={`Progress bars are used to show the completion status of an operation.
      They can be used to show the progress of a task, or the progress of a process.`}
      data={[
        {
          name: "<em>type</em>",
          description: `type of progress <br> <code>"progressive" | "infinite"</code>`,
          default: "<em>progressive</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>maxValue</em>",
          description: `max value of the progress in numeric`,
          default: "<em>100</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>currentValue</em>",
          description: `current value of the progress in numeric`,
          default: "<em>0</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>size</em>",
          description: `size of the progress bar`,
          default: "<em>sm</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>status</em>",
          description: `status of the progress. "success" | "error" | "default"`,
          default: "<em>sm</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>showProgressValue</em>",
          description: `show the progress percentage`,
          default: "<em>false</em>",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default progress;
