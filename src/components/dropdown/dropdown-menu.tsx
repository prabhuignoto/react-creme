import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchIcon } from "../../icons";
import { Input } from "../input/input";
import "./dropdown-menu.scss";
import { DropdownMenuModel } from "./dropdown-model";

const DropDownMenu: React.FunctionComponent<DropdownMenuModel> = React.memo(
  ({
    options,
    handleSelection,
    style: { top, width, maxMenuHeight },
    open,
    onClose,
  }: DropdownMenuModel) => {
    const [menuOptions, setMenuOptions] = useState(options);
    const firstRender = useRef(true);
    const menuRef = useRef<HTMLDivElement>(null);

    const menuStyle = useMemo(() => {
      return {
        "--menu-top": `${top || 0}px`,
        "--menu-width": `${width || 0}px`,
        "--max-height": `${maxMenuHeight}px`,
      } as CSSProperties;
    }, [top, width]);

    const menuClass = useMemo(
      () =>
        classNames([
          "dropdown-menu-container",
          !firstRender.current && {
            "dropdown-menu-open": open,
            "dropdown-menu-close": !open,
          },
        ]),
      [open]
    );

    const handleSearch = useCallback((val) => {
      setMenuOptions((prev) =>
        prev.map((item) => ({
          ...item,
          visible: val ? item.name.includes(val) : !val,
        }))
      );
    }, []);

    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
      }
    }, []);

    useEffect(() => {
      setTimeout(() => {
        if (menuRef.current) {
          menuRef.current.focus();
        }
      }, 200);
    }, [open]);

    return (
      <div className={menuClass} style={menuStyle} tabIndex={0} ref={menuRef}>
        <div className="dropdown-search-input">
          <Input onChange={handleSearch} enableClear>
            <SearchIcon />
          </Input>
        </div>
        <ul className={"dropdown-options"}>
          {menuOptions
            .filter((item) => item.visible)
            .map((option) => (
              <li
                className={classNames([
                  "dropdown-option",
                  option.disabled ? "disabled" : "",
                ])}
                key={option.id}
                onClick={() => handleSelection(option.value, option.id)}
                role="option"
                tabIndex={!option.disabled ? 0 : -1}
              >
                <span className="dropdown-option-value">{option.name}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  },
  (prev, cur) => prev.open === cur.open
);

DropDownMenu.displayName = "DropDownMenu";

export { DropDownMenu };
