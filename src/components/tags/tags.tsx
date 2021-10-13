import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import "../../design/icon.scss";
import "../../design/layout.scss";
import "../../design/list.scss";
import { CloseIcon } from "../../icons";
import { Input } from "../input/input";
import { TagItemModel, TagsModel } from "./tags-model";
import "./tags.scss";

const Tags: React.FunctionComponent<TagsModel> = ({ items, onSelected }) => {
  const [tagItems, setTagItems] = useState<TagItemModel[]>(
    items.map((item) => ({
      name: item.name,
      id: nanoid(),
      disabled: item.disabled,
    }))
  );

  const [inputValue, setInputValue] = useState("");

  const handleChange = useCallback((val: string) => setInputValue(val), []);

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" && inputValue) {
        setTagItems((prev) => prev.concat({ id: nanoid(), name: inputValue }));
        setInputValue("");
      }
    },
    [inputValue]
  );

  const handleRemove = useCallback(
    (val) => setTagItems((tags) => tags.filter((tag) => tag.id !== val)),
    []
  );

  useEffect(() => {
    if (onSelected) {
      onSelected(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  return (
    <div>
      <ul className={"tags-wrap"} role="list">
        {tagItems.map((item) => (
          <li
            key={item.id}
            role="listitem"
            className={classNames(["tag", item.disabled ? "disabled" : ""])}
          >
            <span className="center">{item.name}</span>
            {!item.disabled && (
              <span className="tag-icon" onClick={() => handleRemove(item.id)}>
                <CloseIcon />
              </span>
            )}
          </li>
        ))}
        <li className="tags-input-wrapper">
          <Input
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            value={inputValue}
            enableClear
          />
        </li>
      </ul>
    </div>
  );
};

export { Tags };
