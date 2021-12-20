import { nanoid } from "nanoid";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AutoComplete } from "..";
import "../../design/icon.scss";
import "../../design/layout.scss";
import "../../design/list.scss";
import { Input } from "../input/input";
import { TagItem } from "./tag-item";
import { TagItemInternalModel, TagsModel } from "./tags-model";
import "./tags.scss";

const Tags: React.FunctionComponent<TagsModel> = ({
  disabled = false,
  items = [],
  maxTags = Number.MAX_VALUE,
  onSelected,
  readonly = false,
  restrictToValues = [],
  tagSize = "large",
  tagStyle = "default",
  tagWidth = 50,
  style = {},
  suggestions = [],
  autoComplete = false,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemInternalModel[]>(
    items
      .map((item) => ({
        name: item.name,
        id: nanoid(),
        disabled: item.disabled,
        readonly: readonly,
        markedForRemoval: false,
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

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" && canAdd && inputValue) {
        startTransition(() => {
          setTagItems((prev) =>
            prev.concat({ id: nanoid(), name: inputValue })
          );
        });
        setInputValue("");
      }
    },
    [inputValue, canAdd]
  );

  const handleRemove = useCallback((val) => {
    startTransition(() => {
      setTagItems((tags) =>
        tags.map((tag) =>
          tag.id === val ? { ...tag, markedForRemoval: true } : tag
        )
      );
      setTagItems((tags) => tags.filter((tag) => tag.id !== val));
    });
  }, []);

  // EFFECTS
  useEffect(() => {
    if (onSelected) {
      onSelected(tagItems.map((tag) => tag.name));
    }
  }, [tagItems.length]);

  useEffect(() => {
    startTransition(() => {
      setTagItems(
        items.map((item) => ({
          name: item.name,
          id: nanoid(),
          disabled: item.disabled,
          readonly: readonly,
        }))
      );
    });
  }, [items.length]);

  return (
    <ul className={"rc-tags-wrap"} role="list" style={style}>
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
        />
      ))}
      {canAdd && (
        <li className="rc-tags-input-wrapper">
          {autoComplete && (
            <AutoComplete
              suggestions={suggestions}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={inputValue}
            />
          )}
          {!autoComplete && (
            <Input
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={inputValue}
              enableClear
              controlled
            />
          )}
        </li>
      )}
    </ul>
  );
};

export { Tags };
