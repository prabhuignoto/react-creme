import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function image() {
  return (
    <DemoPageRenderer
      tabTitles={["Image", "properties"]}
      data={[
        {
          name: "<em>src</em>",
          description: "source url of the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "<em>expandOnClick</em>",
          description:
            "expands the image to the best possible resolution on full screen",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default image;
