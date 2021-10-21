import React, { useRef, useState } from "react";
import { Button, Notification } from "../components";

function notification() {
  const ref = useRef();

  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #f8f8f8",
        height: "700px",
        width: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={ref}
    >
      {show && (
        <Notification
          position="bottom-center"
          title="Hello World"
          containedToParent={ref}
          onClose={() => {
            setShow(false);
          }}
        >
          <span>test</span>
        </Notification>
      )}
      <Button label="Open Notification" onClick={() => setShow(true)} />
    </div>
  );
}

export default notification;
