import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCloseOnEscape } from '../common/effects/useCloseOnEsc';
import { useFirstRender } from '../common/effects/useFirstRender';
import useFocusNew from '../common/effects/useFocusNew';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { OverlayModel } from '../common/overlay-model';
import { withOverlay } from '../common/withOverlay';
import { MenuItem } from './menu-item';
import { MenuItemProps, MenuProps } from './menu-model';
import './menu.scss';

interface MenuInternalProps extends OverlayModel {
  items: MenuItemProps[];
  onSelection?: (val: string) => void;
  ref?: RefObject<HTMLUListElement | null>;
}

const Menu = React.forwardRef<HTMLUListElement, MenuInternalProps>(
  (props, ref) => {
    const { items, onSelection } = props;
    const menuClass = useMemo(() => classNames(['rc-menu'], {}), []);

    const listRef = useRef<HTMLUListElement | null>(null);

    const { selection, setSelection } = useKeyNavigation(
      listRef,
      -1,
      items.length
    );

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          listRef.current?.focus();
        },
      } as HTMLUListElement;
    });

    useEffect(() => {
      setSelection(0);
    }, []);

    return (
      <ul className={menuClass} role="menu" ref={listRef} tabIndex={0}>
        {items.map(({ name, id, disabled }, index) => (
          <MenuItem
            name={name}
            disabled={disabled}
            handleSelection={onSelection}
            key={id}
            focus={selection > -1 ? selection === index : index === 0}
          />
        ))}
      </ul>
    );
  }
);

Menu.displayName = 'Menu';

const MenuOverlay = withOverlay<MenuInternalProps>(
  Menu as React.ForwardRefExoticComponent<MenuInternalProps>,
  {
    backdropColor: 'transparent',
    placement: 'bottom',
  }
);

const MenuContainer: React.FunctionComponent<MenuProps> = ({
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

  // HANDLERS
  const toggleMenu = useCallback(() => {
    setShowMenu(prev => {
      if (prev) {
        onClose?.();
      }
      return !prev;
    });
  }, []);

  if (focusable) {
    useFocusNew(wrapperRef, () => {
      setShowMenu(prev => !prev);
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

  const handleSelection = useCallback(name => {
    if (onSelected) {
      onSelected(name);
    }
    setShowMenu(false);
    onClose?.();
    wrapperRef.current?.focus();
  }, []);

  const onInitRef = useCallback(node => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
    wrapperRef.current?.focus();
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

  const handleOnOpen = useCallback(() => {
    if (containerRef) {
      menuRef.current?.focus();
    }
  }, []);

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
            placementReference={wrapperRef}
            placement="bottom"
            onClose={closeMenu}
            onOpen={handleOnOpen}
            align={position}
            ref={menuRef}
          />
        </div>
      )}
    </div>
  );
};

MenuContainer.displayName = 'Menu';

export { MenuContainer };
