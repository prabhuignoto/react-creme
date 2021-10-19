import React from "react";
import { Notification } from "../components";

function notification() {
  return (
    <div>
      <Notification position="top-center" title="Hello World">
        <span>test</span>
      </Notification>
    </div>
  );
}

export default notification;
