import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Alerts"
      description="Alerts are used to notify the user of an important event."
      data={[
        {
          name: "message",
          description: "The message to display in the alert.",
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
      demoWidget={<Widgets />}
    />
  );
}

export default index;
