import React from "react";
import { useNavigate } from "react-router-dom";
import MenuSVG from "./menu.svg?component";

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rc-demo-app-logo" onClick={() => navigate("/")}>
      {isMobile && (
        <span className="rc-demo-menu-icon" onClick={onMenuClick}>
          <MenuSVG />
        </span>
      )}
      <span className="rc-demo-logo-text">React Creme</span>
    </div>
  );
};

export { Logo };
