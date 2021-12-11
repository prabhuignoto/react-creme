import React, { useLayoutEffect, useRef, useState } from "react";
import {
  BlockQuote,
  Button,
  Notification,
  RadioGroup,
  Section,
} from "../../components";
import { NotificationPosition } from "../../components/notification/notification-model";
import useMedia from "../common/useMedia";

const Widgets = () => {
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
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
  const [show3, setShow3] = useState(false);
  const [position, setPosition] = useState<NotificationPosition>("top-left");
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section>
          <BlockQuote>
            The notification can be positioned in different places on the
            screen.
          </BlockQuote>
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
        {show3 && (
          <Notification
            position={position}
            title="Hello World"
            autoClose={3000}
            onClose={() => {
              setShow2(false);
            }}
          >
            <span>test</span>
          </Notification>
        )}
        <Section title="Notification - Default">
          <BlockQuote>
            By default the notification is positioned at the top-left corner of
            the screen relative to the page.
          </BlockQuote>
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <Button label="Open Notification" onClick={() => setShow2(true)} />
          </div>
        </Section>
        <Section title="Notification - Contained Mode">
          <BlockQuote>
            In this example the notification is positioned relative to the
            parent element.
          </BlockQuote>
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
        <Section title="Notification - Auto Close">
          <BlockQuote>
            The notification can be closed automatically after a certain time
            using the autoClose property.
          </BlockQuote>
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <Button label="Open Notification" onClick={() => setShow3(true)} />
          </div>
        </Section>
      </div>
    )
  );
};

export { Widgets };
