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
          name: "<em>message</em>",
          description: "The message to display in the alert.",
          optional: "No",
          default: "",
          type: "string",
        },
        {
          name: "<em>height</em>",
          description: "The height of the alert box.",
          optional: "No",
          default: "<em>100</em>",
          type: "number",
        },
        {
          name: "<em>state</em>",
          description: "The state of the alert.",
          optional: "Yes",
          default: "<em>info</em>",
          type: "string",
        },
        {
          name: "<em>canDismiss</em>",
          description: "Whether or not the alert can be dismissed.",
          optional: "Yes",
          default: "<em>true</em>",
          type: "boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    />
  );
}

export default index;
