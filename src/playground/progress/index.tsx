import React from "react";
import DemoPageRenderer from "./../demo-page-renderer";
import Widgets from "./widgets";

function progress() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "<em>type</em>",
          description: `type of progress <br> <code>"progressive" | "infinite"</code>`,
          default: "progressive",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>maxValue</em>",
          description: `max value of the progress in numeric`,
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>currentValue</em>",
          description: `current value of the progress in numeric`,
          default: "0",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>size</em>",
          description: `size of the progress bar`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>status</em>",
          description: `status of the progress. "success" | "error" | "default"`,
          default: "sm",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>showProgressValue</em>",
          description: `show the progress percentage`,
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["progress", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default progress;
