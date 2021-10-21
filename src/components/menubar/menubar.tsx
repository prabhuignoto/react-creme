import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu } from "../menu/menu";
import { MenuBarItemModel, MenuBarModel } from "./menubar-model";
import "./menubar.scss";

const MenuBar: React.FunctionComponent<MenuBarModel> = ({
  items = [],
  onSelected,
  width = 300,
  align = "left",
}) => {
  const [_items, setMenuItems] = useState<MenuBarItemModel[]>(
    items.map((item) => ({
      id: nanoid(),
      ...item,
      isMenuOpen: false,
      openOnHover: false,
    }))
  );

  const ref = useRef<HTMLUListElement>(null);

  const onOpenMenu = useCallback(
    (id?: string) => {
      setMenuItems((prev) =>
        prev.map((item) => ({
          ...item,
          isMenuOpen: item.id === id,
          openOnHover: true,
        }))
      );
    },
    [_items.length]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleSelection = useCallback((val, name) => {
    onSelected && onSelected(`${name}>${val}`);

    setMenuItems((prev) =>
      prev.map((item) => ({
        ...item,
        openOnHover: false,
        isMenuOpen: false,
      }))
    );
  }, []);

  const menuBarStyle = useMemo(() => {
    return {
      "--min-width": `${width}px`,
    } as CSSProperties;
  }, []);

  const wrapperClass = useMemo(
    () =>
      classNames("rc-menu-bar-wrapper", {
        "align-left": align === "left",
        "align-right": align === "right",
      }),
    []
  );

  const onCloseMenu = useCallback((id) => {
    setMenuItems((prev) =>
      prev.map((item) => ({
        ...item,
        isMenuOpen: false,
        openOnHover: false,
      }))
    );
  }, []);

  return (
    <ul
      className={wrapperClass}
      ref={ref}
      tabIndex={0}
      style={menuBarStyle}
      role="menubar"
      onBlur={onCloseMenu}
    >
      {_items.map(({ id, name, menu, isMenuOpen, openOnHover }) => (
        <li
          key={id}
          className={classNames([
            "rc-menu-bar-item-wrapper",
            {
              "rc-menu-bar-item-active": isMenuOpen,
            },
          ])}
        >
          {menu && (
            <Menu
              items={menu}
              closeManual={!isMenuOpen}
              onOpen={onOpenMenu}
              onClose={onCloseMenu}
              openOnHover={openOnHover}
              id={id}
              onSelected={(val) => handleSelection(val, name)}
            >
              <span className="rc-menu-bar-item-name">{name}</span>
            </Menu>
          )}
        </li>
      ))}
    </ul>
  );
};

export { MenuBar };
