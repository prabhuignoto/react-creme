import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
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
          default: "300",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>position</em>",
          description: `Docking position of the notification popup. <br>
          <code>'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center'</code>`,
          default: "left",
          optional: "Yes",
          type: "String",
        },
        {
          name: "<em>width</em>",
          description: `minimum width of the notification popup`,
          default: "350",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>height</em>",
          description: `minimum height of the notification popup`,
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "<em>autoClose</em>",
          description: `duration in ms after which the notification would auto close`,
          default: "300",
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
      tabTitles={["notification", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default notification;
