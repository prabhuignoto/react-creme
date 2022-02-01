import cls from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { CheckIcon } from '../../icons';
import { ListItemContentProps } from './list-model';

const ListItemContent: React.FunctionComponent<ListItemContentProps> =
  React.memo(
    ({
      name,
      selected,
      showCheck,
      textColor,
      textColorSelected,
      RTL,
      highlightSelection,
    }: ListItemContentProps) => {
      const ref = React.useRef<HTMLDivElement>(null);

      const listOptionClass = cls(
        'rc-list-option-value-wrapper',
        {
          'rc-list-option-highlight-selection': highlightSelection,
          'rc-list-option-no-icon': !showCheck,
          'rc-list-option-rtl': RTL,
          'rc-list-option-selected': selected,
        },
        [selected]
      );

      const style = useMemo(() => {
        return {
          '--text-color': textColor,
          '--text-color-selected': textColorSelected,
        } as CSSProperties;
      }, []);

      return (
        <div className={listOptionClass} ref={ref} style={style}>
          {showCheck && (
            <span
              className={cls('rc-list-option-icon', {
                'rc-list-option-rtl': RTL,
                'rc-list-option-selected': selected,
              })}
            >
              <CheckIcon />
            </span>
          )}
          <span
            className={cls('rc-list-option-value', {
              'rc-list-option-value-selected': selected,
            })}
          >
            {name}
          </span>
        </div>
      );
    },
    (prev, next) => {
      return prev.selected === next.selected;
    }
  );

ListItemContent.displayName = 'ListItemContent';

export { ListItemContent };
