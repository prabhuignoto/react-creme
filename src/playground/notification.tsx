import React, { useEffect, useRef, useState } from "react";
import { Button, Notification, RadioGroup } from "../components";
import { NotificationPosition } from "../components/notification/notification-model";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function notification() {
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [position, setPosition] = useState<NotificationPosition>("top-left");

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
      demoWidget={
        <div className="rc-demo-widgets">
          {show && (
            <Notification
              position={position}
              title="Hello Little World"
              onClose={() => {
                setShow(false);
              }}
              containedToParent={ref}
            >
              <span>test</span>
            </Notification>
          )}
          {show2 && (
            <Notification
              position={position}
              title="Hello Little World"
              onClose={() => {
                setShow2(false);
              }}
            >
              <span>test</span>
            </Notification>
          )}
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <Button label="Open Notification" onClick={() => setShow2(true)} />
          </div>
          <div
            className="rc-demo-widget"
            style={{ width: `${width}px`, minHeight: "300px" }}
            ref={ref}
          >
            <Button
              label="Open Notification (Contained)"
              onClick={() => setShow(true)}
            />
          </div>
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <RadioGroup
              layout="row"
              style={{ marginTop: "2rem" }}
              items={[
                { label: "top-left", value: "top-left", checked: true },
                { label: "top-right", value: "top-right" },
                { label: "bottom-left", value: "bottom-left" },
                { label: "bottom-right", value: "bottom-right" },
                { label: "bottom-center", value: "bottom-center" },
                { label: "top-center", value: "top-center" },
              ]}
              onSelected={(val) => setPosition(val as NotificationPosition)}
            ></RadioGroup>
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default notification;
