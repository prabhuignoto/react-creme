import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  Fragment,
  FunctionComponent,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import { PlusIcon } from '../../icons';
import styles from './kbd.module.scss';

export type KbdProps = {
  buttonRaised?: 'left' | 'right';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};
export type KbdCombinationProps = Pick<KbdProps, 'size'> & {
  children: React.ReactNode[];
};

const Kbd: FunctionComponent<KbdProps> = ({
  children,
  size = 'sm',
  buttonRaised = 'left',
}) => {
  const kbdClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles[`${size}`]]: true,
        [styles[`${buttonRaised}_raised`]]: true,
      }),
    []
  );
  return <kbd className={kbdClass}>{children}</kbd>;
};

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
            <span className={styles.plus}>
              <PlusIcon />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export { Kbd, KbdCombination };
