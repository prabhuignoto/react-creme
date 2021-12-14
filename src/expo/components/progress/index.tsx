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
          name: "type",
          description: `type of progress <br> <code>"progressive" | "infinite"</code>`,
          default: "progressive",
          optional: "Yes",
          type: "String",
        },
        {
          name: "maxValue",
          description: `max value of the progress in numeric`,
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "currentValue",
          description: `current value of the progress in numeric`,
          default: "0",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "size",
          description: `size of the progress bar`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "status",
          description: `status of the progress. "success" | "error" | "default"`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "showProgressValue",
          description: `show the progress percentage`,
          default: "false",
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