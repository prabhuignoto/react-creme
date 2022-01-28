import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '../../design/icon.scss';
import '../../design/layout.scss';
import '../../design/list.scss';
import { AutoSuggest } from '../auto-suggest/auto-suggest';
import { AutoSuggestOption } from '../auto-suggest/auto-suggest.model';
import { TagItem } from './tag-item';
import { TagItemInternalProps, TagsProps } from './tags-model';
import './tags.scss';

const Tags: React.FunctionComponent<TagsProps> = ({
  disabled = false,
  items = [],
  maxTags = Number.MAX_VALUE,
  onChange,
  readonly = false,
  tagSize = 'large',
  tagStyle = 'default',
  tagWidth = 50,
  style = {},
  suggestions = [],
  RTL = false,
  placeholder = '',
  focusable = true,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemInternalProps[]>(
    items
      .map(item => ({
        disabled: item.disabled,
        id: nanoid(),
        markedForRemoval: false,
        name: item.name,
        readonly: readonly,
      }))
      .slice(0, maxTags)
  );

  const [inputValue, setInputValue] = useState('');

  const canAdd = useMemo(
    () => tagItems.length + 1 <= maxTags && !readonly,
    [tagItems.length, inputValue]
  );

  const tagSuggestions = useMemo(
    () =>
      suggestions.map(suggestion => ({
        name: suggestion,
        value: suggestion,
      })),
    []
  );

  // HANDLERS

  const handleChange = useCallback((val: string) => {
    setInputValue(val.trim());
  }, []);

  const handleAdd = useCallback(
    (value: string | AutoSuggestOption) => {
      if (canAdd) {
        const _value = typeof value === 'string' ? value : value.name;
        setTagItems(prev =>
          prev.concat({
            id: nanoid(),
            name: _value,
          })
        );
        setInputValue('');
      }
    },
    [canAdd]
  );

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'Enter' && canAdd && inputValue) {
        handleAdd(inputValue);
      }
    },
    [inputValue, canAdd]
  );

  const handleRemove = useCallback(val => {
    setTagItems(tags =>
      tags.map(tag =>
        tag.id === val ? { ...tag, markedForRemoval: true } : tag
      )
    );
    setTagItems(tags => tags.filter(tag => tag.id !== val));
  }, []);

  // EFFECTS
  useEffect(() => {
    if (onChange) {
      onChange(tagItems.map(tag => tag.name));
    }
  }, [tagItems.length]);

  useEffect(() => {
    setTagItems(
      items.map(item => ({
        disabled: item.disabled,
        id: nanoid(),
        name: item.name,
        readonly: readonly,
      }))
    );
  }, [items.length]);

  return (
    <ul
      className={classNames('rc-tags-wrap', {
        'rc-tags-disabled': disabled,
        'rc-tags-rtl': RTL,
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
          <AutoSuggest
            suggestions={tagSuggestions}
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

Tags.displayName = 'Tags';

export { Tags };
