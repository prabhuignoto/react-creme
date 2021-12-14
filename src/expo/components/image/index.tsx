import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function image() {
  return (
    <DemoPageRenderer
      tabTitles={["examples", "properties"]}
      data={[
        {
          name: "src",
          description: "source url of the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "expandImageOnClick",
          description:
            "expands the image to the best possible resolution on full screen",
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "alt",
          description: "alternative text for the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "width",
          description: "width of the image",
          default: "100%",
          optional: "Yes",
          type: "String",
        },
        {
          name: "height",
          description: "height of the image",
          default: "100%",
          optional: "Yes",
          type: "String",
        },
        {
          name: "onLoad",
          description: "callback when the image is loaded",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "showLoader",
          description: "show loader while image is loading",
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "loaderSize",
          description: "size of the loader",
          default: "sm",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default image;
