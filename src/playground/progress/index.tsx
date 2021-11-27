import React from "react";
import DemoPageRenderer from "./../demo-page-renderer";
import Widgets from "./widgets";

function progress() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "type",
          description: `type of progress <br> <code>"progressive" | "infinite"</code>`,
          default: "progressive",
          optional: "Yes",
        },
        {
          name: "maxValue",
          description: `max value of the progress in numeric`,
          default: "100",
          optional: "Yes",
        },
        {
          name: "currentValue",
          description: `current value of the progress in numeric`,
          default: "0",
          optional: "Yes",
        },
        {
          name: "size",
          description: `size of the progress bar`,
          default: "sm",
          optional: "Yes",
        },
        {
          name: "status",
          description: `status of the progress. "success" | "error" | "default"`,
          default: "sm",
          optional: "Yes",
        },
        {
          name: "showProgressValue",
          description: `show the progress percentage`,
          default: "false",
          optional: "Yes",
        },
      ]}
      tabTitles={["progress", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default progress;
