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
import { MenuBarModel } from "./menubar-model";
import "./menubar.scss";

const MenuBar: React.FunctionComponent<MenuBarModel> = ({
  items = [],
  onSelected,
  width = 300,
  align = "left",
}) => {
  const [_items, setMenuItems] = useState(
    items.map((item) => ({
      id: nanoid(),
      ...item,
      isMenuOpen: false,
    }))
  );

  const wrapperRef = useRef<HTMLUListElement>(null);

  const onOpenMenu = useCallback(
    (id?: string) => {
      setMenuItems((prev) =>
        prev.map((item) => ({
          ...item,
          isMenuOpen: item.id === id,
        }))
      );
    },
    [_items.length]
  );

  const handleBlur = useCallback((ev) => {
    setMenuItems((prev) =>
      prev.map((item) => ({
        ...item,
        isMenuOpen: false,
      }))
    );
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.focus();
    }
  }, []);

  const handleSelection = useCallback((val, name) => {
    onSelected && onSelected(`${name}>${val}`);

    setMenuItems((prev) =>
      prev.map((item) => ({
        ...item,
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
      classNames("menu-bar-wrapper", {
        "align-left": align === "left",
        "align-right": align === "right",
      }),
    []
  );

  return (
    <ul
      className={wrapperClass}
      ref={wrapperRef}
      onBlur={handleBlur}
      tabIndex={0}
      style={menuBarStyle}
    >
      {_items.map(({ id, name, menu, isMenuOpen }) => (
        <li
          key={id}
          className={classNames([
            "menu-bar-item-wrapper",
            {
              "menu-bar-item-active": isMenuOpen,
            },
          ])}
        >
          {menu && (
            <Menu
              items={menu}
              closeManual={!isMenuOpen}
              onOpen={onOpenMenu}
              id={id}
              onSelected={(val) => handleSelection(val, name)}
            >
              <span className="menu-bar-item-name">{name}</span>
            </Menu>
          )}
        </li>
      ))}
    </ul>
  );
};

export { MenuBar };
