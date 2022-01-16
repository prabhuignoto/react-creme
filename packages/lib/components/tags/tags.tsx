import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../design/icon.scss";
import "../../design/layout.scss";
import "../../design/list.scss";
import { AutoComplete } from "../auto-complete/auto-complete";
import { TagItem } from "./tag-item";
import { TagItemInternalModel, TagsModel } from "./tags-model";
import "./tags.scss";

const Tags: React.FunctionComponent<TagsModel> = ({
  disabled = false,
  items = [],
  maxTags = Number.MAX_VALUE,
  onChange,
  readonly = false,
  tagSize = "large",
  tagStyle = "default",
  tagWidth = 50,
  style = {},
  suggestions = [],
  autoComplete = false,
  RTL = false,
  placeholder = "",
  focusable = false,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemInternalModel[]>(
    items
      .map((item) => ({
        disabled: item.disabled,
        id: nanoid(),
        markedForRemoval: false,
        name: item.name,
        readonly: readonly,
      }))
      .slice(0, maxTags)
  );

  const [inputValue, setInputValue] = useState("");

  const canAdd = useMemo(
    () => tagItems.length + 1 <= maxTags && !readonly,
    [tagItems.length, inputValue]
  );

  // HANDLERS

  const handleChange = useCallback(
    (val: string) => setInputValue(val.trim()),
    []
  );

  const handleAdd = useCallback(
    (value: string) => {
      if (canAdd) {
        setTagItems((prev) => prev.concat({ id: nanoid(), name: value }));
        setInputValue("");
      }
    },
    [canAdd]
  );

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" && canAdd && inputValue) {
        handleAdd(inputValue);
      }
    },
    [inputValue, canAdd]
  );

  const handleRemove = useCallback((val) => {
    setTagItems((tags) =>
      tags.map((tag) =>
        tag.id === val ? { ...tag, markedForRemoval: true } : tag
      )
    );
    setTagItems((tags) => tags.filter((tag) => tag.id !== val));
  }, []);

  // EFFECTS
  useEffect(() => {
    if (onChange) {
      onChange(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  useEffect(() => {
    setTagItems(
      items.map((item) => ({
        disabled: item.disabled,
        id: nanoid(),
        name: item.name,
        readonly: readonly,
      }))
    );
  }, [items.length]);

  return (
    <ul
      className={classNames("rc-tags-wrap", {
        "rc-tags-disabled": disabled,
        "rc-tags-rtl": RTL,
      })}
      role="list"
      style={style}
    >
      {tagItems.map(({ id, name, disabled, readonly, markedForRemoval }) => (
        <TagItem
          id={id}
          disabled={disabled}
          readonly={readonly}
          handleRemove={handleRemove}
          key={id}
          name={name}
          width={tagWidth}
          tagStyle={tagStyle}
          tagSize={tagSize}
          markedForRemoval={markedForRemoval}
          focusable={focusable}
        />
      ))}
      {canAdd && (
        <li className="rc-tags-input-wrapper">
          <AutoComplete
            suggestions={suggestions}
            onChange={handleChange}
            onSelection={handleAdd}
            onKeyUp={handleKeyUp}
            value={inputValue}
            placeholder={placeholder}
            focusable={focusable}
          />
        </li>
      )}
    </ul>
  );
};

export { Tags };
