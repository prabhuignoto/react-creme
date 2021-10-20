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

  const [inputValue, setInputValue] = useState("");

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

  // EFFECTS
  useEffect(() => {
    if (onSelected) {
      onSelected(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  return (
    <>
      <ul className={"rc-tags-wrap"} role="list">
        {tagItems.map(({ id, name, disabled }) => (
          <TagItem
            id={id}
            disabled={disabled}
            handleRemove={handleRemove}
            key={id}
            name={name}
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
