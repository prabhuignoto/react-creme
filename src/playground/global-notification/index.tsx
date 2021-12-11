import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import Widgets from "./widgets";

function index() {
  return (
    <DemoPageRenderer
      title="Global notification"
      description="Grabs the attention of the user by displaying a notification in the top of the screen."
      data={[
        {
          name: "<em>height</em>",
          description: "The height of the notification.",
          default: "<em>50</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>delay</em>",
          description: "The delay before the notification appears.",
          default: "<em>0</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>closeAfter</em>",
          description: "The delay before the notification disappears.",
          default: "<em>3000</em>",
          optional: "Yes",
          type: "number",
        },
        {
          name: "<em>state</em>",
          description: "The state of the notification.",
          default: "<em>info</em>",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>message</em>",
          description: "The message of the notification.",
          default: "",
          optional: "Yes",
          type: "string",
        },
        {
          name: "<em>onClose</em>",
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
