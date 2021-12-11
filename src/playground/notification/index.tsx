import React from "react";
import DemoPageRenderer from "../common/demo-page-renderer";
import { Widgets } from "./notification-widgets";

function notification() {
  return (
    <DemoPageRenderer
      title="Notification"
      description="Notification is a component that can be used to display a message to the user."
      data={[
        {
          name: "<em>title</em>",
          description: `Notification title`,
          default: "<em>300</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>position</em>",
          description: `Docking position of the notification popup. <br>
          <code>'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center'</code>`,
          default: "<em>left</em>",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>width</em>",
          description: `minimum width of the notification popup`,
          default: "<em>350</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>height</em>",
          description: `minimum height of the notification popup`,
          default: "<em>100</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>autoClose</em>",
          description: `duration in ms after which the notification would auto close`,
          default: "<em>300</em>",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>onClose</em>",
          description: `callback fired after the popup is closed`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default notification;
