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
  allowDuplicates = false,
}) => {
  // Generate unique ID for aria-describedby
  const descriptionId = React.useMemo(
    () => `rc-tags-description-${nanoid()}`,
    []
  );

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
  const [liveMessage, setLiveMessage] = useState<string>('');

  const canAdd = useMemo(
    () => tagItems.length + 1 <= maxTags && !readonly,
    [tagItems.length, maxTags, readonly]
  );

  const tagSuggestions = useMemo(
    () =>
      suggestions.map(suggestion => ({
        name: suggestion,
        value: suggestion,
      })),
    [suggestions]
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
    [canAdd]
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

        // Check for duplicates if not allowed
        if (!allowDuplicates && tagItems.some(tag => tag.name === _value)) {
          setLiveMessage(`Tag "${_value}" already exists`);
          if (inputRef.current) {
            inputRef.current.setValue('');
            inputRef.current.focus();
          }
          return;
        }

        setTagItems(prev =>
          prev.concat({
            accent,
            id: nanoid(),
            name: _value,
          })
        );
        setLiveMessage(`Tag "${_value}" added`);
        if (inputRef.current) {
          inputRef.current.setValue('');
          inputRef.current.focus();
        }
      }
    },
    [canAdd, accent, tagItems, allowDuplicates]
  );

  const handleRemove = useCallback((val: string) => {
    setTagItems(tags => {
      const removedTag = tags.find(tag => tag.id === val);
      if (removedTag) {
        setLiveMessage(`Tag "${removedTag.name}" removed`);
      }
      return tags.filter(tag => tag.id !== val);
    });

    inputRef.current?.focus();
  }, []);

  // Keyboard navigation between tags with Delete key support
  useKeyNavigation(wrapperRef, focusedTagIndex, tagItems.length, {
    onDelete: () => {
      if (focusedTagIndex >= 0 && tagItems[focusedTagIndex]) {
        handleRemove(tagItems[focusedTagIndex].id || '');
      }
    },
    onNavigate: (index: number) => {
      setFocusedTagIndex(index);
    },
    orientation: 'horizontal',
    rtl: RTL,
    wrap: true,
  });

  // EFFECTS
  useEffect(() => {
    if (onChange && !isFirstRender.current) {
      onChange(tagItems.map(tag => tag.name));
    }
  }, [tagItems, onChange]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setTagItems(prevItems =>
        items
          .map((item, index) => ({
            accent,
            disabled: item.disabled ?? false,
            // Preserve ID if tag exists at same index, otherwise generate new one
            id: prevItems[index]?.id ?? nanoid(),
            name: item.name,
            readonly: readonly ?? false,
          }))
          .slice(0, maxTags)
      );
    }
  }, [items, accent, readonly, maxTags]);

  // Clear live message after announcement
  useEffect(() => {
    if (liveMessage) {
      const timer = setTimeout(() => setLiveMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [liveMessage]);

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          height: '1px',
          left: '-10000px',
          overflow: 'hidden',
          position: 'absolute',
          width: '1px',
        }}
      >
        {liveMessage}
      </div>
      <div
        id={descriptionId}
        style={{
          height: '1px',
          left: '-10000px',
          overflow: 'hidden',
          position: 'absolute',
          width: '1px',
        }}
      >
        {tagItems.length === 0
          ? 'No tags added yet. '
          : `${tagItems.length} tag${tagItems.length !== 1 ? 's' : ''} added. `}
        {maxTags !== Number.MAX_VALUE && `Maximum ${maxTags} tags allowed. `}
        Press Enter to add a tag. Use arrow keys to navigate between tags. Press
        Delete to remove a focused tag.
      </div>
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
        aria-label={`tag list${tagItems.length > 0 ? `, ${tagItems.length} tag${tagItems.length !== 1 ? 's' : ''}` : ''}`}
        aria-describedby={descriptionId}
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
    </>
  );
};

Tags.displayName = 'Tags';

export { Tags };
