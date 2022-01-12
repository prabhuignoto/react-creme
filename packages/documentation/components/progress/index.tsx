import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function progress() {
  return (
    <DemoPageRenderer
      title="Progress"
      description={`Progress bars are used to show the completion status of an operation.
      They can be used to show the progress of a task, or the progress of a process.`}
      properties={[
        {
          name: "type",
          description: `type of progress. can be <em>progressive</em> | <em>infinite</em>`,
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
          description: `status of the progress.
          <em>success</em> | <em>error</em> | <em>default</em>`,
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
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default progress;
