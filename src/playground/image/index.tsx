import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import Widgets from "./widgets";

function image() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "<em>src</em>",
          description: "source url of the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "<em>expandImageOnClick</em>",
          description:
            "expands the image to the best possible resolution on full screen",
          default: "<em>false</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>alt</em>",
          description: "alternative text for the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "<em>width</em>",
          description: "width of the image",
          default: "<em>100%</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>height</em>",
          description: "height of the image",
          default: "<em>100%</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>onLoad</em>",
          description: "callback when the image is loaded",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>showLoader</em>",
          description: "show loader while image is loading",
          default: "<em>true</em>",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "<em>loaderSize</em>",
          description: "size of the loader",
          default: "<em>sm</em>",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default image;
