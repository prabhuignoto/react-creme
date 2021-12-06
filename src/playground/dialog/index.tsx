import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widget } from "./dialog-widgets";

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description="A dialog is a window that displays content in a modal overlay."
      data={[
        {
          name: "<em>title</em>",
          description: "Text title for the dialog",
          default: "",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>width</em>",
          description: "width of the dialog",
          default: "<em>300</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>height</em>",
          description: "height of the dialog",
          default: "<em>200</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>onClose</em>",
          description: "callback invoked on close",
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "<em>onSuccess</em>",
          description: "callback invoked when ok is pressed",
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widget />}
    ></DemoPageRenderer>
  );
}

export default dialog;
