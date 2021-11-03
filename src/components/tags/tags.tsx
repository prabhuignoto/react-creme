import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../design/icon.scss";
import "../../design/layout.scss";
import "../../design/list.scss";
import { Input } from "../input/input";
import { TagItem } from "./tag-item";
import { TagItemModel, TagsModel } from "./tags-model";
import "./tags.scss";

const Tags: React.FunctionComponent<TagsModel> = ({
  items,
  maxTags = Number.MAX_VALUE,
  onSelected,
  readonly = false,
  restrictToValues = [],
  tagWidth = 50,
  tagStyle = "default",
  tagSize = "large",
  disabled = false,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemModel[]>(
    items
      .map((item) => ({
        name: item.name,
        id: nanoid(),
        disabled: item.disabled,
        readonly: readonly,
      }))
      .slice(0, maxTags)
  );

  const [inputValue, setInputValue] = useState("");

  const canAdd = useMemo(
    () => tagItems.length + 1 <= maxTags && !readonly,
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

  // EFFECTS
  useEffect(() => {
    if (onSelected) {
      onSelected(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  useEffect(() => {
    setTagItems(
      items.map((item) => ({
        name: item.name,
        id: nanoid(),
        disabled: item.disabled,
        readonly: readonly,
      }))
    );
  }, [JSON.stringify(items)]);

  return (
    <>
      <ul className={"rc-tags-wrap"} role="list">
        {tagItems.map(({ id, name, disabled, readonly }) => (
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
          />
        ))}
        {canAdd && (
          <li className="rc-tags-input-wrapper">
            <Input
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={inputValue}
              enableClear
            />
          </li>
        )}
      </ul>
    </>
  );
};

export { Tags };
