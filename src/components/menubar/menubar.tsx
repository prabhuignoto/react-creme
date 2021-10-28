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
      const target = (ev.target as HTMLElement).nextSibling as HTMLElement;

      if (target && !target.classList.contains("rc-menu-open") && isMenuOpen) {
        (target.parentElement as HTMLElement).click();
      }
    },
    [isMenuOpen]
  );

  return (
    <ul className={wrapperClass} style={menuBarStyle} role="menubar">
      {_items.current.map(({ id, name, menu }) => (
        <li key={id} className={classNames(["rc-menu-bar-item-wrapper"])}>
          {menu && (
            <Menu
              items={menu}
              onOpen={onOpenMenu}
              onClose={onCloseMenu}
              id={id}
              onSelected={(val) => handleSelection(val, name)}
              closeManual={isMenuOpen}
              position="left"
            >
              <span
                className="rc-menu-bar-item-name"
                onMouseEnter={handleMouseEnter}
              >
                {name}
              </span>
            </Menu>
          )}
        </li>
      ))}
    </ul>
  );
};

export { MenuBar };
