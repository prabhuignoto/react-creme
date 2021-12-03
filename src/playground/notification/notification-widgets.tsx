import React, { useEffect, useRef, useState } from "react";
import { Button, Notification, RadioGroup, Section } from "../../components";
import { NotificationPosition } from "../../components/notification/notification-model";
import useMedia from "../useMedia";

const Widgets = () => {
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
      setWidth(400);
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
    width && (
      <div className="rc-demo-widgets">
        <Section>
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <RadioGroup
              layout="row"
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
        </Section>
        {show && (
          <Notification
            position={position}
            title="Hello World"
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
            title="Hello World"
            onClose={() => {
              setShow2(false);
            }}
          >
            <span>test</span>
          </Notification>
        )}
        <Section title="Notification - Default">
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <Button label="Open Notification" onClick={() => setShow2(true)} />
          </div>
        </Section>
        <Section title="Notification - Contained">
          <div
            className="rc-demo-widget"
            style={{
              width: `${width}px`,
              background: "#f5f5f5",
              height: "400px",
              placeContent: "center",
            }}
            ref={ref}
          >
            <Button
              label="Open Notification (Contained)"
              onClick={() => setShow(true)}
            />
          </div>
        </Section>
      </div>
    )
  );
};

export { Widgets };
