import React from "react";
import { useNavigate } from "react-router-dom";
import MenuSVG from "./images/menu.svg?component";
import "./logo.scss";

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rc-demo-app-logo-container">
      {isMobile && (
        <span className="rc-demo-menu-icon" onClick={onMenuClick}>
          <MenuSVG />
        </span>
      )}
      <div onClick={() => navigate("/")} className="rc-demo-app-logo">
        <span className="rc-demo-logo"></span>
        <span className="rc-demo-logo-text">React Creme</span>
      </div>
    </div>
  );
};

export { Logo };
