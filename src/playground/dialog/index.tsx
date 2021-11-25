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
        },
        {
          name: "width",
          description: "width of the dialog",
          default: "300",
          optional: "Yes",
        },
        {
          name: "height",
          description: "height of the dialog",
          default: "200",
          optional: "Yes",
        },
        {
          name: "onClose",
          description: "callback invoked on close",
          default: "",
          optional: "Yes",
        },
        {
          name: "onSuccess",
          description: "callback invoked when ok is pressed",
          default: "",
          optional: "Yes",
        },
      ]}
      tabTitles={["button", "properties"]}
      demoWidget={<Widget />}
    ></DemoPageRenderer>
  );
}

export default dialog;
