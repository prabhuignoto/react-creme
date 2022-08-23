import cx from 'classnames';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../atoms/home';
import { ReactComponent as MenuSVG } from '../../images/menu.svg';
import './logo.scss';

const Logo: React.FC<{ isMobile?: boolean; onMenuClick: () => void }> = ({
  isMobile,
  onMenuClick,
}) => {
  const { darkMode } = useRecoilValue(themeState);
  const navigate = useNavigate();

  return (
    <div className="rc-demo-app-logo-container" onClick={onMenuClick}>
      {isMobile && (
        <span className={cx('rc-demo-menu-icon', darkMode ? 'dark' : '')}>
          <MenuSVG />
        </span>
      )}
      <div onClick={() => navigate('/')} className="rc-demo-app-logo">
        <span className={cx('rc-demo-logo-text', darkMode ? 'dark' : '')}>
          React Creme
        </span>
      </div>
    </div>
  );
};

export { Logo };
