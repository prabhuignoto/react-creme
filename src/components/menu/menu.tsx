import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePosition } from "../common/effects/usePosition";
import { MenuItemModel, MenuModel } from "./menu-model";
import "./menu.scss";

const Menu: React.FunctionComponent<MenuModel> = React.memo(
  ({
    children,
    closeManual,
    id,
    items,
    onClose,
    onOpen,
    onSelected,
  }: MenuModel) => {
    const menuItems = useRef<MenuItemModel[]>(
      items.map((item) => ({
        id: nanoid(),
        ...item,
      }))
    );
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLUListElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isFirstRender = useRef(true);

    const cssPosition = usePosition(wrapperRef, menuRef, "bottom left", {
      spacing: 5,
      alignToEdge: true,
    });

    const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);
    const closeMenu = useCallback(() => setShowMenu(false), []);

    const menuClass = useMemo(
      () =>
        classNames(["menu"], {
          "menu-open": showMenu,
          "menu-close": !isFirstRender.current && !showMenu,
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

      if (showMenu) {
        onOpen && onOpen(id);
      } else {
        onClose && onClose(id);
      }
    }, [showMenu]);

    const handleMouseDown = useCallback((name) => {
      if (onSelected) {
        onSelected(name);
      }
      setShowMenu(false);
    }, []);

    return (
      <div
        className="menu-wrapper"
        ref={wrapperRef}
        onBlur={closeMenu}
        tabIndex={0}
      >
        <div className="menu-content-wrapper" onClick={toggleMenu}>
          {children}
        </div>
        <ul className={menuClass} ref={menuRef} style={cssPosition} role="menu">
          {menuItems.current.map(({ name, id, disabled }) => (
            <li
              key={id}
              className={classNames(["menu-item"], {
                "menu-item-disabled": disabled,
              })}
              onMouseDown={() => !disabled && handleMouseDown(name)}
              role="menuitem"
            >
              <span className="menu-item-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
  (prev, cur) => prev.closeManual === cur.closeManual
);

export { Menu };
