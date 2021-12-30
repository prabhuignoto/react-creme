import React from "react";
import DemoPageRenderer from "../../common/demo-page-renderer";
import { Widgets } from "./notification-widgets";

function notification() {
  return (
    <DemoPageRenderer
      title="Notification"
      description="Notification is a component that can be used to display a message to the user."
      data={[
        {
          name: "title",
          description: `Notification title`,
          default: "300",
          optional: "Yes",
          type: "String",
        },
        {
          name: "position",
          description: `Docking position of the notification popup. <br>
          <code>'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center'</code>`,
          default: "left",
          optional: "Yes",
          type: "String",
        },
        {
          name: "width",
          description: `minimum width of the notification popup`,
          default: "350",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "height",
          description: `minimum height of the notification popup`,
          default: "100",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "swipeToClose",
          description: `Close the notification with a swipe gesture.
            This option is active only when the notification is docked to either left or right side of the screen`,
          default: "true",
          optional: "Yes",
          type: "Boolean",
        },
        {
          name: "autoClose",
          description: `duration in ms after which the notification would auto close`,
          default: "300",
          optional: "Yes",
          type: "Number",
        },
        {
          name: "onClose",
          description: `callback fired after the popup is closed`,
          default: "",
          optional: "Yes",
          type: "Function",
        },
        {
          name: "disableHeader",
          description: `disables the header`,
          default: "false",
          optional: "Yes",
          type: "Boolean",
        },
      ]}
      tabTitles={["examples", "properties"]}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default notification;
