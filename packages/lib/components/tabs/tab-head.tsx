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

const TabHead: React.FC<TabHeadProps> = React.memo(
  ({
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
  }: TabHeadProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Check if the current mode is dark
    const isDarkMode = isDark();

    // Apply focus if the tab head is focusable
    useFocusNew(!disabled && focusable ? ref : null);

    // Class names for the tab head elements
    const headerLabelClass = `${styles.tab_header_label} ${
      styles[`tab_header_${tabStyle}`]
    } ${icon ? styles.tab_header_label_icon : ''}`;
    const tabHeadClass = `${styles.tab_head} ${
      disabled ? styles.tab_head_disabled : ''
    } ${selected ? styles.tab_head_selected : ''} ${
      styles[`tab_head_${tabStyle}`]
    } ${icon ? styles.tab_head_with_icon : ''} ${styles[`tab_head_${size}`]} ${
      isDarkMode ? styles.dark : ''
    }`;
    const tabHeadIcon = `${styles.tab_head_icon} ${
      selected ? styles.tab_head_selected : ''
    }`;

    // When the selected state changes, focus the tab head if it is selected and the parent has focus
    useEffect(() => {
      if (selected && parentHasFocus) {
        ref.current?.focus();
      }
    }, [selected, parentHasFocus]);

    // Render the tab head
    return (
      <div
        key={id}
        className={tabHeadClass}
        onClick={() => !disabled && id && handleTabSelection(id)}
        role="tab"
        aria-selected={selected}
        aria-controls={`rc-tab-panel-${id}`}
        id={`rc-tab-${id}`}
        onFocus={!parentHasFocus ? onFocus : undefined}
        ref={ref}
        tabIndex={!disabled && focusable && selected ? 0 : -1}
      >
        {icon && (
          <span className={tabHeadIcon} role="img" aria-label="tab-icon">
            {icon}
          </span>
        )}
        <span className={headerLabelClass}>{name}</span>
      </div>
    );
  },
  // Only re-render the component if the selected, disabled, or parentHasFocus properties have changed
  (prev, next) =>
    prev.selected === next.selected &&
    prev.disabled === next.disabled &&
    prev.parentHasFocus === next.parentHasFocus
);

TabHead.displayName = 'TabHead';

export { TabHead };
