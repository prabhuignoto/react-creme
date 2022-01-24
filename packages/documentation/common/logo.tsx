import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MenuSVG } from '../images/menu.svg';
import './logo.scss';

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rc-demo-app-logo-container" onClick={onMenuClick}>
      {isMobile && (
        <span className="rc-demo-menu-icon">
          <MenuSVG />
        </span>
      )}
      <div onClick={() => navigate('/')} className="rc-demo-app-logo">
        {/* <span className="rc-demo-logo"></span>s */}
        <span className="rc-demo-logo-text">React Creme</span>
      </div>
    </div>
  );
};

export { Logo };
