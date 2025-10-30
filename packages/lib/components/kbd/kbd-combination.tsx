import { PlusIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { Fragment, FunctionComponent, ReactNode, useMemo } from 'react';
import { isDark } from '../common/utils';
import { KbdCombinationProps } from './kbd-model';
import styles from './kbd.module.scss';

const KbdCombination: FunctionComponent<KbdCombinationProps> = ({
  children,
  size = 'sm',
}) => {
  const isDarkMode = isDark();

  const items = useMemo<{ child: ReactNode; id: string }[]>(
    () =>
      children
        ? children.map(child => ({
            child,
            id: nanoid(),
          }))
        : [],
    [children]
  );

  const combinationClass = useMemo(
    () =>
      classNames(styles.combination, {
        [styles[`combination_${size}`]]: true,
      }),
    [size]
  );

  return (
    <div className={combinationClass}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {item.child}
          {index < items.length - 1 && (
            <span
              className={classNames(styles.plus, isDarkMode ? styles.dark : '')}
            >
              <PlusIcon />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

KbdCombination.displayName = 'KbdCombination';

export { KbdCombination };
