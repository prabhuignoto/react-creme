import { RateIcon } from '@icons';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { RateItemViewProps } from './rate-model';
import styles from './rate.module.scss';

/**
 * RateItem Component
 *    @property {boolean} active - Whether the rate item is currently active (checked).
 *    @property {boolean} disabled - Whether the rate item is disabled.
 *    @property {boolean} focusable - Whether the rate item is focusable.
 *    @property {boolean} hovered - Whether the rate item is currently being hovered.
 *    @property {React.ReactElement} icon - The custom icon to use for the rate item.
 *    @property {string} id - The unique ID of the rate item.
 *    @property {number} index - The index of the rate item within the rate component.
 *    @property {Function} onMouseOver - Callback function called when the rate item is hovered.
 *    @property {Function} onSelect - Callback function called when the rate item is selected.
 *    @property {string} size - The size of the rate item ('sm', 'md', or 'lg', default: 'sm').
 * @returns {JSX.Element} The RateItem component.
 */
const RateItem: React.FunctionComponent<RateItemViewProps> = ({
  active,
  disabled,
  focusable,
  hovered,
  icon,
  id,
  index,
  onMouseOver,
  onSelect,
  size = 'sm',
}: RateItemViewProps) => {
  const ref = useRef<HTMLLIElement | null>(null);

  // Check if the dark mode is enabled
  const isDarkMode = useMemo(() => isDark(), []);

  // Hook to manage focus and keyboard navigation for the rate item
  useFocusNew(
    focusable && !disabled ? (ref as React.RefObject<HTMLElement>) : null,
    focusable ? () => onSelect(index) : null
  );

  // Calculate the class for the rate item based on its state (active, hovered, disabled, size, dark mode)
  const rateItemClass = useMemo(
    () =>
      classNames(styles.item, {
        [styles.active]: active,
        [styles[size]]: true,
        [styles.disabled]: disabled,
        [styles.hovered]: hovered,
        [styles.dark]: isDarkMode,
      }),
    [active, hovered, disabled, size, isDarkMode]
  );

  // Generate the props for focusable elements
  const focusableProps = useMemo(
    () =>
      focusable && {
        ref,
        tabIndex: 0,
      },
    [focusable]
  );

  // Generate the props for disabled elements
  const disabledProps = useMemo(
    () =>
      disabled && {
        'aria-disabled': disabled,
      },
    [disabled]
  );

  // Handle keyboard events for selecting rate items
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onSelect(index);
    }
  };

  return (
    <li
      key={id}
      className={rateItemClass}
      onMouseOver={() => onMouseOver(index)}
      onFocus={() => onMouseOver(index)}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
      aria-checked={active}
      role="radio" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
      {...focusableProps}
      {...disabledProps}
    >
      {/* The icon representing the rate item */}
      <span role="img" aria-label="star">
        {icon || <RateIcon />}
      </span>
    </li>
  );
};

RateItem.displayName = 'RateItem';

export { RateItem };
