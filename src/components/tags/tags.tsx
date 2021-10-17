import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../../design/icon.scss";
import "../../design/layout.scss";
import "../../design/list.scss";
import { CloseIcon } from "../../icons";
import { DropDownMenu } from "../dropdown/dropdown-menu";
import { Option } from "../dropdown/dropdown-model";
import { Input } from "../input/input";
import { TagItemModel, TagsModel } from "./tags-model";
import "./tags.scss";

const Tags: React.FunctionComponent<TagsModel> = ({
  items,
  onSelected,
  maxTags = Number.MAX_VALUE,
  restrictToValues = [],
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemModel[]>(
    items
      .map((item) => ({
        name: item.name,
        id: nanoid(),
        disabled: item.disabled,
      }))
      .slice(0, maxTags)
  );

  const _restrictToValues = useRef(
    Array.isArray(restrictToValues)
      ? restrictToValues.map((val) => ({
          id: nanoid(),
          name: val,
          value: val,
          selected: false,
          visible: true,
        }))
      : []
  );

  const [inputValue, setInputValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdown = useCallback(() => setShowMenu((prev) => !prev), []);

  const canAdd = useMemo(
    () => tagItems.length + 1 <= maxTags,
    [tagItems.length]
  );

  // HANDLERS

  const handleChange = useCallback((val: string) => setInputValue(val), []);

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" && inputValue && canAdd) {
        setTagItems((prev) => prev.concat({ id: nanoid(), name: inputValue }));
        setInputValue("");
      }
    },
    [inputValue, canAdd]
  );

  const handleRemove = useCallback(
    (val) => setTagItems((tags) => tags.filter((tag) => tag.id !== val)),
    []
  );

  const handleSelection = useCallback((options: Option[]) => {}, []);

  // EFFECTS
  useEffect(() => {
    if (onSelected) {
      onSelected(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  return (
    <>
      <ul className={"rc-tags-wrap"} role="list">
        {tagItems.map((item) => (
          <li
            key={item.id}
            role="listitem"
            className={classNames([
              "rc-tag",
              item.disabled ? "rc-tag-disabled" : "",
            ])}
          >
            <span className="center">{item.name}</span>
            {!item.disabled && (
              <span
                className="rc-tag-icon"
                onClick={() => handleRemove(item.id)}
              >
                <CloseIcon />
              </span>
            )}
          </li>
        ))}
        {canAdd && (
          <li className="rc-tags-input-wrapper">
            {restrictToValues.length ? (
              <div className="rc-tags-input-container" onClick={toggleDropdown}>
                <Input
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  value={inputValue}
                  enableClear
                />
              </div>
            ) : (
              <Input
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                value={inputValue}
                enableClear
              />
            )}
            <DropDownMenu
              options={_restrictToValues.current}
              open={showMenu}
              style={{ width: 200, top: 40 }}
              handleSelection={handleSelection}
              allowMultipleSelection
            />
          </li>
        )}
      </ul>
    </>
  );
};

export { Tags };
