import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFirstRender } from '../../common/effects/useFirstRender';
import RateIcon from '../../common/icons/star';
import { RateItem } from './rate-item';
import { RateItemProps, RateProps } from './rate-model';
import styles from './rate.module.scss';

const Rate: React.FunctionComponent<RateProps> = ({
  focusable = true,
  icon,
  iconCount = 5,
  onChange,
  ratingValues = [],
  size = 'sm',
  value = 0,
  disabled = false,
  RTL = false,
}) => {
  const [items, setItems] = React.useState<RateItemProps[]>(
    Array.from({ length: iconCount }).map(() => ({
      active: false,
      hovered: false,
      id: nanoid(),
    }))
  );

  const lastSelectedIndex = React.useRef<number>(-1);
  const lastHoverIndex = React.useRef<number>(-1);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    value ? value - 1 : -1
  );
  const [hoverIndex, setHoverIndex] = React.useState<number>(-1);

  const handleSelection = useCallback((idx: number) => {
    setSelectedIndex(idx);
    lastSelectedIndex.current = idx;

    if (!onChange) return;

    if (ratingValues.length) {
      onChange(ratingValues[idx]);
    } else {
      onChange(idx + 1);
    }
  }, []);

  const handleHover = useDebouncedCallback((idx: number) => {
    if (!disabled) {
      setHoverIndex(idx);
      lastHoverIndex.current = idx;
      setSelectedIndex(-1);
    }
  }, 10);

  const handleLeave = useDebouncedCallback(() => {
    if (!disabled) {
      setHoverIndex(-1);
      setSelectedIndex(lastSelectedIndex.current);
      lastHoverIndex.current = -1;
    }
  }, 10);

  useEffect(() => {
    setItems(prev =>
      prev.map((item, index) => ({
        ...item,
        active: index <= lastSelectedIndex.current,
      }))
    );
  }, [selectedIndex]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setItems(prev =>
        prev.map((item, index) => ({
          ...item,
          hovered: index <= lastHoverIndex.current,
        }))
      );
    }
  }, [hoverIndex]);

  const isFirstRender = useFirstRender();

  const rateWrapperClass = useMemo(() => {
    return classNames(styles.wrapper, {
      [styles.disabled]: disabled,
      [styles.rtl]: RTL,
    });
  }, [disabled]);

  return (
    <ul
      className={rateWrapperClass}
      role="radiogroup"
      onMouseLeave={handleLeave}
    >
      {items.map(({ id, active, hovered }, index) => {
        return (
          <RateItem
            key={id}
            active={active}
            hovered={hovered}
            icon={icon || <RateIcon />}
            id={id}
            index={index}
            onSelect={handleSelection}
            onMouseOver={handleHover}
            size={size}
            focusable={focusable}
            disabled={disabled}
          />
        );
      })}
    </ul>
  );
};

Rate.displayName = 'Rate';

export { Rate };
