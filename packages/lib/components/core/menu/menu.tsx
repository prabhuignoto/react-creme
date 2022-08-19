import {
  useCloseOnEscape,
  useFirstRender,
  useFocusNew,
  useOnClickOutside,
} from '@common';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MenuItemProps, MenuProps } from './menu-model';
import { MenuOverlay, MenuOverlayProps } from './menu-overlay';
import styles from './menu.module.scss';

const Menu: React.FunctionComponent<MenuProps> = ({
  children,
  dockPosition = 'left',
  focusable = true,
  id,
  items = [],
  onClose,
  onOpen,
  onSelected,
  size = 'sm',
  style,
  gutter = 12,
  hideArrow = false,
}: MenuProps) => {
  const [menuItems] = useState<MenuItemProps[]>(
    items.map(item => ({
      id: nanoid(),
      ...item,
    }))
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Handle the menu opening and closing
   */
  const toggleMenu = useCallback(() => {
    setShowMenu(prev => {
      if (prev) {
        onClose?.();
      }
      return !prev;
    });
  }, []);

  /**
   * Handles the menu selection
   */
  const handleSelection = useCallback((name: string) => {
    if (onSelected) {
      onSelected(name);
    }
    setShowMenu(false);
    onClose?.();
    wrapperRef.current?.focus();
  }, []);

  /**
   * Handles menu closure
   */
  const closeMenu = useCallback(() => {
    setShowMenu(false);
    wrapperRef.current?.focus();
  }, []);

  /**
   * Handler executed when the menu is rendered the first time
   */
  const handleOnOpen = useCallback(() => {
    const menu = menuRef.current as MenuOverlayProps;

    setTimeout(() => {
      if (menu.element) {
        menu.element.querySelectorAll('li')[0].focus();
      }
    }, 10);
  }, []);

  /**
   * Setups focus
   */
  useFocusNew(
    focusable ? wrapperRef : null,
    focusable
      ? () => {
          setShowMenu(prev => !prev);
        }
      : null
  );

  /**
   * Close menu on esc key
   */
  useCloseOnEscape(() => setShowMenu(false), wrapperRef);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (showMenu && wrapperRef.current) {
      wrapperRef.current.focus();
      onOpen && onOpen(id);
    }
  }, [showMenu]);

  const onInitRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  /**
   * classNames
   */
  const menuContentWrapperClass = useMemo(
    () =>
      classNames([styles.menu_content_wrapper], {
        [styles.menu_content_focusable]: !focusable,
      }),
    [showMenu, focusable]
  );

  const menuWrapperClass = useMemo(() => {
    return classNames([styles.menu_wrapper], {
      [styles[`menu-wrapper-${size}`]]: true,
    });
  }, []);

  /**
   * setup the focus props
   */
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
  }, []);

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
          />
        </div>
      )}
    </div>
  );
};

Menu.displayName = 'Menu';

export { Menu };
