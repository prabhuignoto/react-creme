import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function image() {
  return (
    <DemoPageRenderer
      tabTitles={["Image", "properties"]}
      data={[
        {
          name: "src",
          description: "source url of the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "expandOnClick",
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
