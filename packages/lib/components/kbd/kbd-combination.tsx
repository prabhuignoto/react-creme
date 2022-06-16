import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { Fragment, FunctionComponent, ReactNode, useMemo, useRef } from 'react';
import { PlusIcon } from '../../icons';
import { isDark } from '../common/utils';
import { KbdCombinationProps } from './kbd';
import styles from './kbd.module.scss';

const KbdCombination: FunctionComponent<KbdCombinationProps> = ({
  children,
  size = 'sm',
}) => {
  const items = useRef<{ child: ReactNode; id: string }[]>(
    children
      ? children.map(child => ({
          child,
          id: nanoid(),
        }))
      : []
  );

  const combLen = useRef(items.current.length);
  const isDarkMode = useMemo(() => isDark(), []);

  const combinationClass = useMemo(
    () =>
      classNames(styles.combination, {
        [styles[`combination_${size}`]]: true,
      }),
    []
  );

  return (
    <div className={combinationClass}>
      {items.current.map((item, index) => (
        <Fragment key={item.id}>
          {item.child}
          {index >= 0 && index < combLen.current - 1 && (
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
