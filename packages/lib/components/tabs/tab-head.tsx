import classNames from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { TabHeadProps } from './tabs-model';
import './tabs.scss';

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
  }: TabHeadProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // enable focus outlines
    if (!disabled && focusable) {
      // useFocus(ref, () => handleTabSelection(id));
      useFocusNew(ref);
      // useKey(ref, () => handleTabSelection(id));
    }

    const headerLabelClass = useMemo(() => {
      return classNames('rc-tab-header-label', {
        [`rc-tab-header-${tabStyle}`]: true,
        'rc-tab-header-label-icon': icon,
      });
    }, [icon]);

    const tabHeadClass = useMemo(() => {
      return classNames('rc-tab-head', {
        'rc-tab-head-disabled': disabled,
        'rc-tab-head-selected': selected,
        [`rc-tab-head-${tabStyle}`]: true,
      });
    }, [disabled, selected]);

    const tabHeadIcon = useMemo(() => {
      return classNames('rc-tab-head-icon', {
        'rc-tab-head-icon-selected': selected,
      });
    }, []);

    useEffect(() => {
      if (!selected) {
        return;
      }
      if (selected && parentHasFocus) {
        // ref.current?.focus();
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
      >
        {icon && <span className={tabHeadIcon}>{icon}</span>}
        <span
          className={headerLabelClass}
          ref={ref}
          tabIndex={!disabled && focusable && selected ? 0 : -1}
        >
          {name}
        </span>
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
