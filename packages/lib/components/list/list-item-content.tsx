import cls from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { CheckIcon } from '../../icons';
import styles from './list-item.module.scss';
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
      size,
    }: ListItemContentProps) => {
      const ref = React.useRef<HTMLDivElement>(null);

      const listOptionClass = cls(
        [styles.list_option_value_wrapper],
        {
          [styles.list_option_highlight_selection]: highlightSelection,
          [styles.list_option_no_icon]: !showCheck,
          [styles.list_option_rtl]: RTL,
          [styles.list_option_selected]: selected,
          [styles[`list_option_${size}`]]: size,
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
              className={cls(styles.list_option_icon, {
                [styles.list_option_rtl]: RTL,
                [styles.list_option_selected]: selected,
              })}
            >
              <CheckIcon />
            </span>
          )}
          <span
            className={cls(styles.list_option_value, {
              [styles.list_option_value_selected]: selected,
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
