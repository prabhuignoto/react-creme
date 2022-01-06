import React, { lazy } from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";

function index() {
  return (
    <DemoPageRenderer
      title="Alerts"
      description="Alerts are used to notify the user of an important event."
      callbacks={[
        {
          name: "onDismiss",
          description: "The function to call when the alert is dismissed.",
          optional: "Yes",
          default: "",
          type: "function",
        },
      ]}
      properties={[
        {
          name: "message",
          description: `The message to display in the alert.
          can be one of <em>success</em> | <em>error</em> | <em>warning</em> | <em>info</em>`,
          optional: "No",
          default: "",
          type: "string",
        },
        {
          name: "height",
          description: "The height of the alert box.",
          optional: "No",
          default: "100",
          type: "number",
        },
        {
          name: "state",
          description: "The state of the alert.",
          optional: "Yes",
          default: "info",
          type: "string",
        },
        {
          name: "canDismiss",
          description: "Whether or not the alert can be dismissed.",
          optional: "Yes",
          default: "true",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={lazy(() => import("./widgets"))}
    />
  );
}

export default index;
