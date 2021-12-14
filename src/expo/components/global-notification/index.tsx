import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Global notification"
      description="Grabs the attention of the user by displaying a notification in the top of the screen."
      data={[
        {
          name: "height",
          description: "The height of the notification.",
          default: "50",
          optional: "Yes",
          type: "number",
        },
        {
          name: "delay",
          description: "The delay before the notification appears.",
          default: "0",
          optional: "Yes",
          type: "number",
        },
        {
          name: "closeAfter",
          description: "The delay before the notification disappears.",
          default: "3000",
          optional: "Yes",
          type: "number",
        },
        {
          name: "state",
          description: "The state of the notification.",
          default: "info",
          optional: "Yes",
          type: "string",
        },
        {
          name: "message",
          description: "The message of the notification.",
          default: "",
          optional: "Yes",
          type: "string",
        },
        {
          name: "onClose",
          description:
            "The callback function to be called when the notification is closed.",
          default: "",
          optional: "Yes",
          type: "function",
        },
      ]}
      demoWidget={<Widgets />}
      tabTitles={["examples", "properties"]}
    ></DemoPageRenderer>
  );
}

export default index;
