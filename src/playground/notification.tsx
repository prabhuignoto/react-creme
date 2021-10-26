import React, { useRef, useState } from "react";
import { Button, Notification, RadioGroup } from "../components";
import { NotificationPosition } from "../components/notification/notification-model";

function notification() {
  const ref = useRef();

  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<NotificationPosition>("top-right");

  return (
    <div
      style={{
        border: "1px solid #f8f8f8",
        height: "700px",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={ref}
    >
      {show && (
        <Notification
          position={position}
          title="Hello Little World"
          containedToParent={ref}
          onClose={() => {
            setShow(false);
          }}
        >
          <span>test</span>
        </Notification>
      )}
      <Button label="Open Notification" onClick={() => setShow(true)} />
      <RadioGroup
        style={{ marginTop: "2rem" }}
        items={[
          { label: "top-left", value: "top-left" },
          { label: "top-right", value: "top-right" },
          { label: "bottom-left", value: "bottom-left" },
          { label: "bottom-right", value: "bottom-right" },
          { label: "bottom-center", value: "bottom-center" },
          { label: "top-center", value: "top-center" },
        ]}
        onSelected={(val) => setPosition(val as NotificationPosition)}
      ></RadioGroup>
    </div>
  );
}

export default notification;
