import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widget } from "./dialog-widgets";

function dialog() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "title",
          description: "Text title for the dialog",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "width",
          description: "width of the dialog",
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "height",
          description: "height of the dialog",
          default: "200",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "onClose",
          description: "callback invoked on close",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "onSuccess",
          description: "callback invoked when ok is pressed",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["button", "properties"]}
      demoWidget={<Widget />}
    ></DemoPageRenderer>
  );
}

export default dialog;
