import React from "react";
import DemoPageRenderer from "../demo-page-renderer";
import { Widgets } from "./notification-widgets";

function notification() {
  return (
    <DemoPageRenderer
      data={[
        {
          name: "title",
          description: `Notification title`,
          default: "300",
          optional: "Yes",
        },
        {
          name: "position",
          description: `Docking position of the notification popup. <br>
          <code>'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center'</code>`,
          default: "left",
          optional: "Yes",
        },
        {
          name: "width",
          description: `minimum width of the notification popup`,
          default: "350",
          optional: "Yes",
        },
        {
          name: "height",
          description: `minimum height of the notification popup`,
          default: "100",
          optional: "Yes",
        },
        {
          name: "autoClose",
          description: `duration in ms after which the notification would auto close`,
          default: "300",
          optional: "Yes",
        },
        {
          name: "onClose",
          description: `callback fired after the popup is closed`,
          default: "",
          optional: "Yes",
        },
      ]}
      tabTitles={["notification", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default notification;
