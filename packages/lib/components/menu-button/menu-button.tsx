import { ChevronDownIcon } from '@icons';
import cx from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isDark } from '../common/utils';
import { Menu } from '../menu/menu';
import { MenuItemProps } from '../menu/menu-model';
import { MenuButtonProps } from './menu-button.model';
import styles from './menu-button.module.scss';

const MenuButton: React.FC<MenuButtonProps> = ({
  items = [],
  onSelected,
  focusable = true,
  width = 150,
  disabled = false,
  RTL = false,
  iconColor,
  size = 'sm',
}) => {
  // Initialize menuItems once with useMemo instead of useRef
  const menuItems = useMemo<MenuItemProps[]>(
    () =>
      items.slice(1).map(item => ({
        id: nanoid(),
        name: item,
      })),
    [items]
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const handleChange = useCallback(
    (item: string) => {
      onSelected?.(item);
    },
    [onSelected]
  );

  const menuButtonClass = useMemo(
    () =>
      cx(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.rtl]: RTL,
        [styles[size]]: true,
        [styles.dark]: isDarkMode,
        [styles.clickable]: true,
      }),
    [disabled, RTL, size, isDarkMode]
  );

  const menuPosition = useMemo(() => {
    return RTL ? 'left' : 'right';
  }, [RTL]);

  const menuStyle = useMemo(() => {
    return {
      '--icon-color': iconColor,
      '--max-width': `${width}px`,
    } as CSSProperties;
  }, [iconColor, width]);

  const iconClass = useMemo(
    () =>
      cx(styles.icon, {
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode]
  );

  const labelClass = useMemo(
    () => cx(styles.label, { [styles.dark]: isDarkMode }, styles[size]),
    [isDarkMode, size]
  );

  const menuButtonRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    if (!disabled) {
      setMenuOpen(!menuOpen);
    }
  }, [disabled, menuOpen]);

  const handlePrimaryClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleChange(items[0]);
    },
    [handleChange, items]
  );

  return (
    <div
      className={menuButtonClass}
      style={menuStyle}
      onClick={handleButtonClick}
      ref={menuButtonRef}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-haspopup="true"
      aria-expanded={menuOpen}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }
      }}
    >
      <div role="button" aria-label={items[0]} onClick={handlePrimaryClick}>
        <label className={labelClass}>{items[0]}</label>
      </div>

      <Menu
        items={menuItems}
        focusable={focusable}
        onSelected={handleChange}
        dockPosition={menuPosition}
        size={size}
        gutter={15}
        hideArrow
        leftOffset={10 * (RTL ? -1 : 1)}
      >
        <span className={iconClass} role="img" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </Menu>
    </div>
  );
};

// Memoize the MenuButton component for better performance
const MemoizedMenuButton = React.memo(MenuButton);
MemoizedMenuButton.displayName = 'MenuButton';

export { MemoizedMenuButton as MenuButton };
