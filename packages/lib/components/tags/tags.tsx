import { RCInputElementProps } from '@components/input/input';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '../../design/core.scss';
import '../../design/list.scss';
import { AutoSuggest } from '../auto-suggest/auto-suggest';
import { AutoSuggestOption } from '../auto-suggest/auto-suggest.model';
import { useFirstRender } from '../common/effects/useFirstRender';
import { TagItem } from './tag-item';
import { TagItemProps, TagsProps } from './tags-model';
import './tags.scss';

const Tags: React.FunctionComponent<TagsProps> = ({
  disabled = false,
  items = [],
  maxTags = Number.MAX_VALUE,
  onChange,
  readonly = false,
  size = 'sm',
  tagStyle = 'default',
  tagWidth = 60,
  style = {},
  suggestions = [],
  RTL = false,
  placeholder = '',
  focusable = true,
  accent = 'flat',
  wrap = true,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemProps[]>(
    items
      .map(({ name, disabled }) => ({
        accent,
        disabled: disabled,
        id: nanoid(),
        markedForRemoval: false,
        name: name,
        readonly,
      }))
      .slice(0, maxTags)
  );

  const isFirstRender = useFirstRender();

  const [inputValue, setInputValue] = useState('');

  const inputRef = React.useRef<RCInputElementProps | null>(null);

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

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'Enter' && canAdd && inputRef.current) {
        const val = inputRef.current.getValue().trim();

        if (val) {
          handleAdd(val);
        }
      }
    },
    [canAdd, inputValue]
  );

  const handleChange = useCallback((val?: string) => {
    val && setInputValue(val.trim());
  }, []);

  const handleAdd = useCallback(
    (value: string | AutoSuggestOption) => {
      if (canAdd) {
        const _value = typeof value === 'string' ? value : value.name;
        setTagItems(prev =>
          prev.concat({
            accent,
            id: nanoid(),
            name: _value,
          })
        );
        if (inputRef.current) {
          inputRef.current.setValue('');
          inputRef.current.focus();
        }
      }
    },
    [canAdd]
  );

  const handleRemove = useCallback(val => {
    setTagItems(tags => tags.filter(tag => tag.id !== val));

    inputRef.current?.focus();
  }, []);

  // EFFECTS
  useEffect(() => {
    if (onChange && !isFirstRender.current) {
      onChange(tagItems.map(tag => tag.name));
    }
  }, [tagItems.length]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setTagItems(
        items
          .map(item => ({
            accent,
            disabled: item.disabled,
            id: nanoid(),
            name: item.name,
            readonly: readonly,
          }))
          .slice(0, maxTags)
      );
    }
  }, [items.length]);

  return (
    <ul
      className={classNames('rc-tags-wrapper', {
        'rc-tags-disabled': disabled,
        'rc-tags-rtl': RTL,
        'rc-tags-wrap': wrap,
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
          tagWidth={tagWidth}
          tagStyle={tagStyle}
          size={size}
          markedForRemoval={markedForRemoval}
          focusable={focusable}
          accent={accent}
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
            accent={accent}
            ref={inputRef}
            size={size}
            disableIcon={!suggestions.length}
          />
        </li>
      )}
    </ul>
  );
};

Tags.displayName = 'Tags';

export { Tags };
