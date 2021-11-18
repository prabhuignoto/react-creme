import classNames from "classnames";
import React, { useMemo } from "react";
import { AvatarIcon } from "../../icons";
import "./avatar.scss";

export interface AvatarProps {
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FunctionComponent<AvatarProps> = ({ size = "sm" }) => {
  const avatarClass = useMemo(() => {
    return classNames({ "rc-avatar": true, [`rc-avatar-${size}`]: true });
  }, []);

  return (
    <div className={avatarClass}>
      <AvatarIcon />
    </div>
  );
};

export { Avatar };
