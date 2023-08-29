import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCloseOnEscape } from '../common/effects/useCloseOnEsc';
import { useFirstRender } from '../common/effects/useFirstRender';
import useFocusNew from '../common/effects/useFocusNew';
import useOnClickOutside from '../common/effects/useOnClickOutside';
import { MenuItemProps, MenuProps } from './menu-model';
import { MenuOverlay, MenuOverlayProps } from './menu-overlay';
import styles from './menu.module.scss';

/**
 * Menu Component
 *    @property {React.ReactNode} children - The children nodes.
 *    @property {string} dockPosition - The dock position of the menu.
 *    @property {boolean} focusable - Whether the menu is focusable.
 *    @property {string} id - The id of the menu.
 *    @property {MenuItemProps[]} items - The items of the menu.
 *    @property {() => void} onClose - Function to handle menu close.
 *    @property {() => void} onOpen - Function to handle menu open.
 *    @property {(name: string) => void} onSelected - Function to handle menu selection.
 *    @property {string} size - The size of the menu.
 *    @property {React.CSSProperties} style - The style of the menu.
 *    @property {number} gutter - The gutter of the menu.
 *    @property {boolean} hideArrow - Whether to hide the arrow of the menu.
 *    @property {number} leftOffset - The left offset of the menu.
 *    @property {boolean} RTL - Whether the menu is right-to-left.
 * @returns {JSX.Element} The Menu component.
 */
const Menu: React.FunctionComponent<MenuProps> = ({
  children,
  dockPosition = 'left',
  focusable = false,
  id,
  items = [],
  onClose,
  onOpen,
  onSelected,
  size = 'sm',
  style,
  gutter = 12,
  hideArrow = false,
  leftOffset = 0,
  RTL = false,
}: MenuProps) => {
  const [menuItems] = useState<MenuItemProps[]>(
    items.map(item => ({
      id: nanoid(),
      ...item,
    }))
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu(prev => {
      if (prev) {
        onClose?.();
      }
      return !prev;
    });
  }, [onClose]);

  const handleSelection = useCallback(
    (name: string) => {
      onSelected?.(name);
      setShowMenu(false);
      onClose?.();
      wrapperRef.current?.focus();
    },
    [onSelected, onClose]
  );

  const closeMenu = useCallback(() => {
    setShowMenu(false);
    wrapperRef.current?.focus();
  }, []);

  const handleOnOpen = useCallback(() => {
    const menu = menuRef.current as unknown as MenuOverlayProps;

    setTimeout(() => {
      if (menu.element) {
        menu.element.querySelectorAll('li')[0].focus();
      }
    }, 10);
  }, []);

  useFocusNew(
    focusable ? wrapperRef : null,
    focusable
      ? () => {
          setShowMenu(prev => !prev);
        }
      : null
  );

  useCloseOnEscape(() => setShowMenu(false), wrapperRef);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (showMenu && wrapperRef.current) {
      wrapperRef.current.focus();
      onOpen?.(id);
    }
  }, [showMenu, onOpen, id]);

  const onInitRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  const menuContentWrapperClass = useMemo(
    () =>
      classNames([styles.menu_content_wrapper], {
        [styles.menu_content_focusable]: !focusable,
      }),
    [focusable]
  );

  const menuWrapperClass = useMemo(() => {
    return classNames([styles.menu_wrapper], {
      [styles[`menu-wrapper-${size}`]]: true,
    });
  }, [size]);

  const focusProps = useMemo(
    () =>
      focusable
        ? {
            tabIndex: 0,
          }
        : null,
    [focusable]
  );

  const handleClickOnOutside = useCallback(() => {
    setShowMenu(prev => {
      if (prev) {
        onClose?.();
        return !prev;
      }

      return prev;
    });
  }, [onClose]);

  const { onRef } = useOnClickOutside(handleClickOnOutside);

  return (
    <div className={menuWrapperClass} style={style} ref={onRef}>
      <div
        className={menuContentWrapperClass}
        onClick={toggleMenu}
        ref={onInitRef}
        {...focusProps}
      >
        {children}
      </div>
      {showMenu && (
        <div className={styles.menu_overlay_wrapper}>
          <MenuOverlay
            items={menuItems}
            onSelection={handleSelection}
            placementReference={wrapperRef}
            placement="bottom"
            onClose={closeMenu}
            onOpen={handleOnOpen}
            ref={menuRef}
            focusable={focusable}
            placementOffset={gutter}
            size={size}
            align={dockPosition}
            dockPosition={dockPosition}
            hideArrow={hideArrow}
            leftOffset={leftOffset}
            RTL={RTL}
          />
        </div>
      )}
    </div>
  );
};

Menu.displayName = 'Menu';

export { Menu };
