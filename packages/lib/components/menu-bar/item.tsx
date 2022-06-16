import classNames from 'classnames';
import { FunctionComponent, memo, useMemo } from 'react';
import { ChevronDownIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { MenuBarItemViewProps } from './menu-bar.model';
import styles from './menu-bar.module.scss';

const MenuBarItem: FunctionComponent<MenuBarItemViewProps> = memo(
  ({ active, showIcon, icon, size = 'sm', RTL = false, name, isMenuOpen }) => {
    const isDarkMode = useMemo(() => isDark(), []);

    const isFirstRender = useFirstRender();

    return (
      <li
        className={classNames(styles.item, isDarkMode && styles.dark, {
          [styles.active]: active,
        })}
      >
        {showIcon && (
          <span className={classNames(styles.icon, styles.size)}>{icon}</span>
        )}
        <span
          className={classNames(
            styles.name,
            styles[size],
            RTL ? styles.rtl : '',
            active ? styles.active : ''
          )}
        >
          {name}
        </span>
        <span
          className={classNames(
            styles.chevron_icon,
            styles[size],
            RTL ? styles.rtl : '',
            isMenuOpen
              ? styles.rotate
              : !isFirstRender.current
              ? styles.rotate_reverse
              : ''
          )}
        >
          <ChevronDownIcon />
        </span>
      </li>
    );
  },
  (prev, next) => prev.active === next.active
);

MenuBarItem.displayName = 'MenuBarItem';

export { MenuBarItem };
