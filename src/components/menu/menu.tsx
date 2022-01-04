import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import { useFirstRender } from "../common/effects/useFirstRender";
import { useFocus } from "../common/effects/useFocus";
import { usePosition } from "../common/effects/usePosition";
import { MenuItem } from "./menu-item";
import { MenuItemModel, MenuModel } from "./menu-model";
import "./menu.scss";

const Menu: React.FunctionComponent<MenuModel> = ({
  children,
  id,
  items = [],
  onClose,
  onOpen,
  onSelected,
  position = "left",
  focusable = true,
  style,
}: MenuModel) => {
  const [menuItems] = useState<MenuItemModel[]>(
    items.map((item) => ({
      id: nanoid(),
      ...item,
    }))
  );
  const menuRef = useRef<HTMLUListElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useFirstRender();

  const [showMenu, setShowMenu] = useState(false);

  const cssPosition = usePosition(wrapperRef, menuRef, `bottom ${position}`, {
    spacing: 5,
    alignToEdge: true,
  });

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

  const menuClass = useMemo(
    () =>
      classNames(["rc-menu"], {
        "rc-menu-open": showMenu,
        "rc-menu-close": !isFirstRender.current && !showMenu,
      }),
    [showMenu]
  );

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

  const closeMenu = useCallback((ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    if (wrapperRef.current) {
      const isChild = wrapperRef.current?.contains(target);

      if (!isChild) {
        setShowMenu(false);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const menuContentWrapperClass = useMemo(
    () =>
      classNames(["rc-menu-content-wrapper"], {
        "rc-menu-not-focusable": !focusable,
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
    <div className="rc-menu-wrapper" style={style}>
      <div
        className={menuContentWrapperClass}
        onClick={toggleMenu}
        ref={onInitRef}
        {...contentWrapperProps}
      >
        {children}
        <ul className={menuClass} ref={menuRef} style={cssPosition} role="menu">
          {menuItems.map(({ name, id, disabled }) => (
            <MenuItem
              name={name}
              disabled={disabled}
              handleSelection={handleSelection}
              key={id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };
