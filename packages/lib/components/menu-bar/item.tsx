import { ChevronDownIcon } from '@icons';
import classNames from 'classnames';
import { FunctionComponent, memo, useMemo } from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { MenuBarItemViewProps } from './menu-bar.model';
import styles from './menu-bar.module.scss';

/**
 * MenuBarItem Component
 *    @property {boolean} active - Whether the menu bar item is active.
 *    @property {boolean} showIcon - Whether to show the icon.
 *    @property {React.ReactNode} icon - The icon of the menu bar item.
 *    @property {string} size - The size of the menu bar item.
 *    @property {boolean} RTL - Whether the menu bar item is right-to-left.
 *    @property {string} name - The name of the menu bar item.
 *    @property {boolean} isMenuOpen - Whether the menu is open.
 * @returns {JSX.Element} The MenuBarItem component.
 */
const MenuBarItem: FunctionComponent<MenuBarItemViewProps> = memo(
  ({ active, showIcon, icon, size = 'sm', RTL = false, name, isMenuOpen }) => {
    const isDarkMode = useMemo(() => isDark(), []);
    const isFirstRender = useFirstRender();

    const menuBarItemClass = useMemo(
      () =>
        classNames(
          styles.item,
          isDarkMode && styles.dark,
          {
            [styles.active]: active,
          },
          RTL ? styles.rtl : ''
        ),
      [active, isDarkMode, RTL]
    );

    return (
      <li className={menuBarItemClass}>
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
  (prev, next) =>
    prev.active === next.active && prev.isMenuOpen === next.isMenuOpen
);

MenuBarItem.displayName = 'MenuBarItem';

export { MenuBarItem };
