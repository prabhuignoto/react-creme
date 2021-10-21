import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocus } from "../common/effects/useFocus";
import { useKeyWithDependency } from "../common/effects/useKey";
import { usePosition } from "../common/effects/usePosition";
import { MenuItemModel, MenuModel } from "./menu-model";
import "./menu.scss";

const Menu: React.FunctionComponent<MenuModel> = ({
  children,
  closeManual,
  id,
  items,
  onClose,
  onOpen,
  onSelected,
  openOnHover,
}: MenuModel) => {
  const menuItems = useRef<MenuItemModel[]>(
    items.map((item) => ({
      id: nanoid(),
      ...item,
    }))
  );
  const menuRef = useRef<HTMLUListElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const [showMenu, setShowMenu] = useState(false);

  const cssPosition = usePosition(wrapperRef, menuRef, "bottom left", {
    spacing: 5,
    alignToEdge: true,
  });

  // HANDLERS
  const toggleMenu = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();
      setShowMenu(!showMenu);
    },
    [showMenu]
  );

  const toggleViaKeyboard = useCallback(() => setShowMenu((prev) => !prev), []);

  useFocus(wrapperRef, { bgHighlight: false });
  useKeyWithDependency(wrapperRef, toggleViaKeyboard, showMenu);

  // const closeMenu = useCallback(() => {
  //   setShowMenu(false);
  //   onClose && onClose(id);
  // }, []);

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
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender.current && closeManual) {
      setShowMenu(false);
    }
  }, [closeManual]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (showMenu && wrapperRef.current) {
      wrapperRef.current.focus();
      onOpen && onOpen(id);
    }
  }, [showMenu, openOnHover]);

  const handleSelection = useCallback((name) => {
    if (onSelected) {
      onSelected(name);
    }
    setShowMenu(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (openOnHover) {
      setShowMenu(true);
    }
  }, [openOnHover]);

  return (
    <div
      className="rc-menu-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseDown={toggleMenu}
    >
      <div className="rc-menu-content-wrapper" ref={wrapperRef}>
        {children}
        <ul className={menuClass} ref={menuRef} style={cssPosition} role="menu">
          {menuItems.current.map(({ name, id, disabled }) => (
            <li
              key={id}
              className={classNames(["rc-menu-item"], {
                "rc-menu-item-disabled": disabled,
              })}
              onMouseDown={() => !disabled && handleSelection(name)}
              role="menuitem"
            >
              <span className="rc-menu-item-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };
