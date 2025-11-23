import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './tab-header.module.scss';
import { TabHeadProps } from './tabs-model';

/**
 * TabHead Component
 *    @property {boolean} disabled - Whether the tab head is disabled.
 *    @property {boolean} focusable - Whether the tab head is focusable.
 *    @property {(id: string) => void} handleTabSelection - Function to handle tab selection.
 *    @property {string} id - The unique identifier for the tab head.
 *    @property {string} name - The name of the tab.
 *    @property {boolean} selected - Whether the tab head is currently selected.
 *    @property {string} tabStyle - The style of the tabs ('flat' is default).
 *    @property {React.ReactNode} icon - The icon of the tab head.
 *    @property {() => void} onFocus - Function to handle focus event.
 *    @property {boolean} parentHasFocus - Whether the parent component has focus.
 *    @property {string} size - The size of the tab head.
 * @returns {JSX.Element} The TabHead component.
 */

const TabHead = React.forwardRef<HTMLButtonElement, TabHeadProps>(
  (
    {
      disabled,
      focusable,
      handleTabSelection,
      id,
      name,
      selected,
      tabStyle,
      icon,
      onFocus,
      parentHasFocus,
      size,
    }: TabHeadProps,
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref =
      (forwardedRef as React.RefObject<HTMLButtonElement>) || internalRef;

    // Check if the current mode is dark
    const isDarkMode = isDark();

    // Apply focus if the tab head is focusable
    useFocusNew(
      !disabled && focusable ? (ref as React.RefObject<HTMLElement>) : null
    );

    // Class names using classNames utility
    const headerLabelClass = classNames(styles.tab_header_label, {
      [styles[`tab_header_${tabStyle}`]]: tabStyle,
      [styles.tab_header_label_icon]: icon,
    });

    const tabHeadClass = classNames(styles.tab_head, {
      [styles.tab_head_disabled]: disabled,
      [styles.tab_head_selected]: selected,
      [styles[`tab_head_${tabStyle}`]]: tabStyle,
      [styles.tab_head_with_icon]: icon,
      [styles[`tab_head_${size}`]]: size,
      [styles.dark]: isDarkMode,
    });

    const tabHeadIconClass = classNames(styles.tab_head_icon, {
      [styles.tab_head_selected]: selected,
    });

    // When the selected state changes, focus the tab head if it is selected and the parent has focus
    useEffect(() => {
      if (selected && parentHasFocus && ref.current) {
        ref.current.focus();
      }
    }, [selected, parentHasFocus, ref]);

    // Render the tab head as a button
    return (
      <button
        key={id}
        type="button"
        className={tabHeadClass}
        onClick={() => !disabled && id && handleTabSelection(id)}
        role="tab"
        aria-selected={selected}
        aria-controls={`rc-tab-panel-${id}`}
        id={`rc-tab-${id}`}
        onFocus={!parentHasFocus ? onFocus : undefined}
        ref={ref}
        tabIndex={!disabled && focusable && selected ? 0 : -1}
        disabled={disabled}
      >
        {icon && (
          <span className={tabHeadIconClass} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={headerLabelClass}>{name}</span>
      </button>
    );
  }
);

TabHead.displayName = 'TabHead';

export { TabHead };
