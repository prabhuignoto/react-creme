import { RateIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFirstRender } from '../common/effects/useFirstRender';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { RateItem } from './rate-item';
import { RateItemProps, RateProps } from './rate-model';
import styles from './rate.module.scss';

/**
 * Rate Component
 *    @property {boolean} focusable - Whether the rate is focusable (default: true).
 *    @property {React.ReactElement} icon - The custom icon to use for the rate items.
 *    @property {number} iconCount - The total number of rate items (default: 5).
 *    @property {Function} onChange - Callback function called when the rate value changes.
 *    @property {Array} ratingValues - An array of custom rating values (optional).
 *    @property {string} size - The size of the rate items ('sm', 'md', or 'lg', default: 'sm').
 *    @property {number} value - The current rate value (default: 0).
 *    @property {boolean} disabled - Whether the rate is disabled (default: false).
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 * @returns {JSX.Element} The Rate component.
 */
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
  // State to manage the rate items (active and hovered states)
  const [items, setItems] = useState<RateItemProps[]>(
    Array.from({ length: iconCount }).map(() => ({
      active: false,
      hovered: false,
      id: nanoid(),
    }))
  );

  // Refs to keep track of last selected and hovered index
  const lastSelectedIndex = useRef<number>(-1);
  const lastHoverIndex = useRef<number>(-1);

  // State to manage the currently selected and hovered index
  const [selectedIndex, setSelectedIndex] = useState<number>(
    value ? value - 1 : -1
  );
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  // Function to handle rate item selection
  const handleSelection = useCallback(
    (idx: number) => {
      setSelectedIndex(idx);
      lastSelectedIndex.current = idx;

      if (!onChange) return;

      if (ratingValues.length) {
        onChange(ratingValues[idx]);
      } else {
        onChange(idx + 1);
      }
    },
    [onChange, ratingValues]
  );

  // Debounced functions to handle rate item hover and leave
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

  // Keyboard navigation between rate items
  const wrapperRef = useRef<HTMLElement>(null!);
  useKeyNavigation(wrapperRef, selectedIndex >= 0 ? selectedIndex : -1, iconCount, {
    orientation: 'horizontal',
    rtl: RTL,
    wrap: true,
    onNavigate: (index: number) => {
      handleSelection(index);
    },
  });

  // Effect to update the active state of rate items when the selected index changes
  useEffect(() => {
    setItems(prev =>
      prev.map((item, index) => ({
        ...item,
        active: index <= lastSelectedIndex.current,
      }))
    );
  }, [selectedIndex]);

  // Effect to update the hovered state of rate items when the hover index changes
  const isFirstRender = useFirstRender();
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

  // Calculate the class for the rate wrapper based on disabled and RTL status
  const rateWrapperClass = useMemo(() => {
    return classNames(styles.wrapper, {
      [styles.disabled]: disabled,
      [styles.rtl]: RTL,
    });
  }, [disabled, RTL]);

  return (
    <ul
      className={rateWrapperClass}
      role="radiogroup"
      aria-label="rating"
      onMouseLeave={handleLeave}
      ref={wrapperRef as React.RefObject<HTMLUListElement>}
      tabIndex={-1}
    >
      {items.map(({ id, active, hovered }, index) => (
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
      ))}
    </ul>
  );
};

Rate.displayName = 'Rate';

export { Rate };
