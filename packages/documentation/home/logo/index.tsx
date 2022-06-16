import classNames from 'classnames';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../atoms/home';
import { ReactComponent as MenuSVG } from '../../images/menu.svg';
import './logo.scss';

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => {
  const { darkMode } = useRecoilValue(themeState);
  const navigate = useNavigate();

  return (
    <div className="rc-demo-app-logo-container" onClick={onMenuClick}>
      {isMobile && (
        <span
          className={classNames('rc-demo-menu-icon', darkMode ? 'dark' : '')}
        >
          <MenuSVG />
        </span>
      )}
      <div onClick={() => navigate('/')} className="rc-demo-app-logo">
        <span className="rc-demo-logo-text">React Creme</span>
      </div>
    </div>
  );
};

export { Logo };
