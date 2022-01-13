import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function dialog() {
  return (
    <DemoPageRenderer
      title="Dialog"
      description="A dialog is a window that displays content in a modal overlay."
      callbacks={[
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
      properties={[
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
      ]}
      tabTitles={["examples", "properties", "Stackblitz"]}
      stackBlitzCodes={["react-ts-9dnouy"]}
      demoWidget={lazy(() => import("./dialog-widgets"))}
    ></DemoPageRenderer>
  );
}

export default dialog;
