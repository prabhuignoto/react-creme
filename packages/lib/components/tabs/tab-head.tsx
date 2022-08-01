import classNames from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import styles from './tab-header.module.scss';
import { TabHeadProps } from './tabs-model';

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

    const isDarkMode = useMemo(() => isDark(), []);

    // enable focus outlines
    useFocusNew(!disabled && focusable ? ref : null);

    const headerLabelClass = useMemo(() => {
      return classNames(styles.tab_header_label, {
        [styles[`tab_header_${tabStyle}`]]: true,
        [styles.tab_header_label_icon]: icon,
      });
    }, [icon]);

    const tabHeadClass = useMemo(() => {
      return classNames(styles.tab_head, {
        [styles.tab_head_disabled]: disabled,
        [styles.tab_head_selected]: selected,
        [styles[`tab_head_${tabStyle}`]]: true,
        [styles.tab_head_with_icon]: icon,
        [styles[`tab_head_${size}`]]: true,
        [styles.dark]: isDarkMode,
      });
    }, [disabled, selected, icon, isDarkMode]);

    const tabHeadIcon = useMemo(() => {
      return classNames(styles.tab_head_icon, {
        [styles.tab_head_selected]: selected,
      });
    }, []);

    useEffect(() => {
      if (!selected) {
        return;
      }
      if (selected && parentHasFocus) {
        ref.current?.focus();
      }
    }, [selected, parentHasFocus]);

    return (
      <div
        key={id}
        className={tabHeadClass}
        onClick={() => !disabled && handleTabSelection(id)}
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
  (prev, next) =>
    prev.selected === next.selected &&
    prev.disabled === next.disabled &&
    prev.parentHasFocus === next.parentHasFocus
);

TabHead.displayName = 'TabHead';

export { TabHead };
