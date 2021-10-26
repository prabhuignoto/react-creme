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
  const _items = useRef<MenuBarItemModel[]>(
    items.map((item) => ({
      id: nanoid(),
      ...item,
      isMenuOpen: false,
      openOnHover: false,
    }))
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef<HTMLUListElement>(null);

  const onCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const onOpenMenu = useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const closeWhenClickedOutside = useCallback((ev: MouseEvent | TouchEvent) => {
    const whiteList = [
      "rc-menu-bar-item-name",
      "rc-menu-item-name",
      "rc-menu-item",
    ];
    const classes = Array.from((ev.target as HTMLElement).classList);

    if (classes.some((cls) => whiteList.indexOf(cls) < 0)) {
      onCloseMenu();
    }
  }, []);

  useEffect(() => {
    // if (ref.current) {
    //   ref.current.focus();
    // }
    document.addEventListener("click", closeWhenClickedOutside);

    return () => {
      document.removeEventListener("click", closeWhenClickedOutside);
    };
  }, []);

  const handleSelection = useCallback((val, name) => {
    onSelected && onSelected(`${name}>${val}`);
    onCloseMenu();
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

  const handleMouseEnter = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      const target = ev.target as HTMLElement;

      if (isMenuOpen && target.classList.contains("rc-menu-bar-item-name")) {
        const menu = target.parentElement?.parentElement;
        if (menu) {
          console.log("jumbo");

          menu.click();
        }
      }
    },
    [isMenuOpen]
  );

  return (
    <ul
      className={wrapperClass}
      ref={ref}
      // tabIndex={0}
      style={menuBarStyle}
      role="menubar"
    >
      {_items.current.map(({ id, name, menu }) => (
        <li
          key={id}
          className={classNames([
            "rc-menu-bar-item-wrapper",
            {
              "rc-menu-bar-item-active": isMenuOpen,
            },
          ])}
          onMouseOver={handleMouseEnter}
        >
          {menu && (
            <Menu
              items={menu}
              onOpen={onOpenMenu}
              onClose={onCloseMenu}
              id={id}
              onSelected={(val) => handleSelection(val, name)}
              closeManual={isMenuOpen}
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
