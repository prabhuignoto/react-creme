import React from "react";
import MenuSVG from "./menu.svg?component";

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => (
  <div className="rc-demo-app-logo">
    {isMobile && (
      <span className="rc-demo-menu-icon" onClick={onMenuClick}>
        <MenuSVG />
      </span>
    )}
    <span className="rc-demo-logo-text">React Creme</span>
  </div>
);

export { Logo };
