import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function image() {
  return (
    <DemoPageRenderer
      title="Image"
      description="Embed images in your app with the Image component."
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-fujyxg"]}
      callbacks={[
        {
          name: "onLoad",
          description: "Callback executed on image load",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      properties={[
        {
          name: "src",
          description: "Source url of the image",
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
          description: "Alternative text for the image",
          default: "",
          optional: "No",
          type: "String",
        },
        {
          name: "width",
          description: "Width of the image",
          default: "100%",
          optional: "Yes",
          type: "String",
        },
        {
          name: "height",
          description: "Height of the image",
          default: "100%",
          optional: "Yes",
          type: "String",
        },
        {
          name: "showLoader",
          description: "Shows a loader while the image is loading",
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "loaderSize",
          description:
            "Size of the loading icon. can be <em>sm</em> | <em>md</em> | <em>lg</em>",
          default: "sm",
          optional: "Yes",
          type: "String",
        },
      ]}
      demoWidget={lazy(() => import("./widgets"))}
    ></DemoPageRenderer>
  );
}

export default image;
