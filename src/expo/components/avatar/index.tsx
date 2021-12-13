import React from "react";
import { Avatar } from "../../../components";
import "./avatar.scss";
function avatar() {
  return (
    <div className="rc-play-avatar">
      <div className="rc-play-avatar-item">
        <Avatar />
      </div>
      <div className="rc-play-avatar-item">
        <Avatar size="md" />
      </div>
      <div className="rc-play-avatar-item">
        <Avatar size="lg" />
      </div>
    </div>
  );
}

export default avatar;
