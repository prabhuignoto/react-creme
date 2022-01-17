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
import { useFocus } from '../common/effects/useFocus';
import { OverlayModel } from '../common/overlay-model';
import { withOverlay } from '../common/withOverlay';
import { MenuItem } from './menu-item';
import { MenuItemProps, MenuProps } from './menu-model';
import './menu.scss';

interface MenuInternalProps extends OverlayModel {
  items: MenuItemProps[];
  onSelection?: (val: string) => void;
}

const Menu: React.FunctionComponent<MenuInternalProps> = ({
  items,
  onSelection,
}) => {
  const menuClass = useMemo(() => classNames(['rc-menu'], {}), []);

  return (
    <ul className={menuClass} role="menu">
      {items.map(({ name, id, disabled }) => (
        <MenuItem
          name={name}
          disabled={disabled}
          handleSelection={onSelection}
          key={id}
        />
      ))}
    </ul>
  );
};

const MenuOverlay = withOverlay<MenuInternalProps>(Menu, {
  backdropColor: 'transparent',
  placement: 'bottom',
});

const MenuContainer: React.FunctionComponent<MenuProps> = ({
  children,
  id,
  items = [],
  onClose,
  onOpen,
  onSelected,
  position = 'left',
  focusable = true,
  style,
}: MenuProps) => {
  const [menuItems] = useState<MenuItemProps[]>(
    items.map((item) => ({
      id: nanoid(),
      ...item,
    }))
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();
  const containerRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  // HANDLERS
  const toggleMenu = useCallback((ev: React.MouseEvent | KeyboardEvent) => {
    setShowMenu((prev) => {
      if (prev) {
        onClose?.();
      }
      return !prev;
    });
  }, []);

  if (focusable) {
    useFocus(wrapperRef, () => {
      setShowMenu((prev) => !prev);
    });
  }

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

  const handleSelection = useCallback((name) => {
    if (onSelected) {
      onSelected(name);
    }
    setShowMenu(false);
    onClose?.();
  }, []);

  const onInitRef = useCallback((node) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const menuContentWrapperClass = useMemo(
    () =>
      classNames(['rc-menu-content-wrapper'], {
        'rc-menu-not-focusable': !focusable,
      }),
    [showMenu, focusable]
  );

  const contentWrapperProps = useMemo(
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
        {...contentWrapperProps}
      >
        {children}
      </div>
      {showMenu && (
        <div className="rc-menu-overlay-wrapper">
          <MenuOverlay
            items={menuItems}
            onSelection={handleSelection}
            placementReference={containerRef}
            placement="bottom"
            onClose={closeMenu}
            align={position}
          />
        </div>
      )}
    </div>
  );
};

export { MenuContainer };
