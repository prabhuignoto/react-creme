import React from "react";
import { Avatar } from "../components";

function avatar() {
  return (
    <div>
      <div>
        <Avatar />
      </div>
      <div>
        <Avatar size="md" />
      </div>
      <div>
        <Avatar size="lg" />
      </div>
    </div>
  );
}

export default avatar;
