import '@design/core.scss';
import '@design/list.scss';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AutoSuggest } from '../auto-suggest/auto-suggest';
import { AutoSuggestOption } from '../auto-suggest/auto-suggest.model';
import { useFirstRender } from '../common/effects/useFirstRender';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { RCInputElementProps } from '../input/input';
import { TagItem } from './tag-item';
import { TagItemProps, TagsProps } from './tags-model';
import styles from './tags.module.scss';

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
  tagHeight = null,
}) => {
  // STATES
  const [tagItems, setTagItems] = useState<TagItemProps[]>(
    items
      .map(({ name, disabled }) => ({
        accent,
        disabled: disabled ?? false,
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
  const wrapperRef = useRef<HTMLElement>(null!);
  const [focusedTagIndex, setFocusedTagIndex] = useState<number>(-1);

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
    if (val) {
      setInputValue(val.trim());
    }
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

  const handleRemove = useCallback((val: string) => {
    setTagItems(tags => tags.filter(tag => tag.id !== val));

    inputRef.current?.focus();
  }, []);

  // Keyboard navigation between tags with Delete key support
  useKeyNavigation(wrapperRef, focusedTagIndex, tagItems.length, {
    orientation: 'horizontal',
    rtl: RTL,
    wrap: true,
    onNavigate: (index: number) => {
      setFocusedTagIndex(index);
    },
    onDelete: () => {
      if (focusedTagIndex >= 0 && tagItems[focusedTagIndex]) {
        handleRemove(tagItems[focusedTagIndex].id || '');
      }
    },
  });

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
            disabled: item.disabled ?? false,
            id: nanoid(),
            name: item.name,
            readonly: readonly ?? false,
          }))
          .slice(0, maxTags)
      );
    }
  }, [items.length]);

  return (
    <ul
      className={classNames(styles.tags_wrapper, {
        [styles.tags_disabled]: disabled,
        [styles.tags_rtl]: RTL,
        [styles.tags_wrap]: wrap,
      })}
      style={Object.assign(
        {},
        style,
        tagHeight
          ? {
              '--tag-height': `${tagHeight}px`,
            }
          : {}
      )}
      ref={wrapperRef as React.RefObject<HTMLUListElement>}
      role="list"
      aria-label="tag list"
      tabIndex={-1}
    >
      {tagItems.map(({ id, name, disabled, readonly, markedForRemoval }) => (
        <TagItem
          id={id ?? ''}
          disabled={disabled ?? false}
          readonly={readonly ?? false}
          handleRemove={handleRemove}
          key={id}
          name={name}
          tagWidth={tagWidth}
          tagStyle={tagStyle}
          size={size}
          markedForRemoval={markedForRemoval ?? false}
          focusable={focusable}
          accent={accent}
        />
      ))}
      {canAdd && (
        <li className={styles.tags_input_wrapper}>
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
