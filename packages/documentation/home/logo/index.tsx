import cx from 'classnames';
import { useMemo } from 'react';

import { isDark } from '@lib';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as MenuSVG } from '../../images/menu.svg';
import styles from './logo.module.scss';

const Logo: React.FC<{ isMobile?: boolean; onMenuClick: () => void }> = ({
  isMobile,
  onMenuClick,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const location = useLocation();
  const isLanding = useMemo(
    () => location.pathname === '/landing' || location.pathname === '/',
    [location]
  );

  const navigate = useNavigate();

  return (
    <div className={cx(styles.container)} onClick={onMenuClick}>
      {isMobile && !isLanding && (
        <span className={cx(styles.menu_icon, isDarkMode ? styles.dark : '')}>
          <MenuSVG />
        </span>
      )}
      <div onClick={() => navigate('/')} className={styles.app_logo}>
        {/* <span className={cx(styles.logo_text, isDarkMode ? styles.dark : '')}>
          React Creme
        </span> */}
      </div>
    </div>
  );
};

export { Logo };
