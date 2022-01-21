import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import RateIcon from '../../icons/star';
import { useFirstRender } from '../common/effects/useFirstRender';
import { RateItem } from './rate-item';
import { RateItemProps, RateProps } from './rate-model';
import './rate.scss';

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
      setSelectedIndex(-1);
    }
  }, 10);

  const handleLeave = useDebouncedCallback(() => {
    if (!disabled) {
      setHoverIndex(-1);
      setSelectedIndex(lastSelectedIndex.current);
    }
  }, 10);

  useEffect(() => {
    setItems((prev) =>
      prev.map((item, index) => ({
        ...item,
        active: index <= selectedIndex,
      }))
    );
  }, [selectedIndex]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setItems((prev) =>
        prev.map((item, index) => ({
          ...item,
          hovered: index <= hoverIndex,
        }))
      );
    }
  }, [hoverIndex]);

  const isFirstRender = useFirstRender();

  const rateWrapperClass = useMemo(() => {
    return classNames('rc-rate-wrapper', {
      'rc-rate-disabled': disabled,
      'rc-rate-rtl': RTL,
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
