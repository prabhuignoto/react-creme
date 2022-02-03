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
import { MenuItemProps, MenuProps } from './menu-model';
import { MenuOverlay } from './menu-overlay';
import './menu.scss';

const Menu: React.FunctionComponent<MenuProps> = ({
  children,
  focusable = true,
  id,
  items = [],
  onClose,
  onOpen,
  onSelected,
  position = 'left',
  style,
}: MenuProps) => {
  const [menuItems] = useState<MenuItemProps[]>(
    items.map(item => ({
      id: nanoid(),
      ...item,
    }))
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();
  const containerRef = useRef<HTMLDivElement>(null);
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
  const handleSelection = useCallback(name => {
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
    if (containerRef) {
      menuRef.current?.focus();
    }
  }, []);

  /**
   * Setups focus
   */
  if (focusable) {
    useFocusNew(wrapperRef, () => {
      setShowMenu(prev => !prev);
    });
  }

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

  const onInitRef = useCallback(node => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  /**
   * classNames
   */
  const menuContentWrapperClass = useMemo(
    () =>
      classNames(['rc-menu-content-wrapper'], {
        'rc-menu-not-focusable': !focusable,
      }),
    [showMenu, focusable]
  );

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

  return (
    <div className="rc-menu-wrapper" style={style} ref={containerRef}>
      <div
        className={menuContentWrapperClass}
        onClick={toggleMenu}
        ref={onInitRef}
        {...focusProps}
      >
        {children}
      </div>
      {showMenu && (
        <div className="rc-menu-overlay-wrapper">
          <MenuOverlay
            items={menuItems}
            onSelection={handleSelection}
            placementReference={wrapperRef}
            placement="bottom"
            onClose={closeMenu}
            onOpen={handleOnOpen}
            align={position}
            ref={menuRef}
            focusable={focusable}
          />
        </div>
      )}
    </div>
  );
};

Menu.displayName = 'Menu';

export { Menu };
