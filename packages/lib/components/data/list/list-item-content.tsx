import cls from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { CheckIcon } from '@common/icons';
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
      size = 'sm',
    }: ListItemContentProps) => {
      const ref = React.useRef<HTMLDivElement>(null);

      const listOptionClass = cls(
        [styles.value_wrapper],
        {
          [styles.highlight_selection]: highlightSelection,
          [styles.no_icon]: !showCheck,
          [styles.rtl]: RTL,
          [styles.selected]: selected,
          [styles[size]]: size,
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
              className={cls(styles.icon, {
                [styles.rtl]: RTL,
                [styles.selected]: selected,
              })}
            >
              <CheckIcon />
            </span>
          )}
          <span
            className={cls(styles.value, {
              [styles.value_selected]: selected,
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
