import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import { PlusIcon } from '../../icons';
import { isDark } from '../common/utils';
import styles from './kbd.module.scss';

export type KbdProps = {
  buttonRaised?: 'left' | 'right';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  thickness?: number;
};
export type KbdCombinationProps = Pick<KbdProps, 'size'> & {
  children: React.ReactNode[];
};

const Kbd: FunctionComponent<KbdProps> = memo(
  ({ children, size = 'sm', buttonRaised = 'left', thickness = 2 }) => {
    const isDarkMode = useMemo(() => isDark(), []);

    const kbdClass = useMemo(
      () =>
        classNames(styles.wrapper, {
          [styles[`${size}`]]: true,
          [styles[`${buttonRaised}_raised`]]: true,
          [styles.dark]: isDarkMode,
        }),
      []
    );

    const style = useMemo(
      () =>
        ({
          '--rc-kbd-thickness': `${thickness}px`,
        } as CSSProperties),
      []
    );

    return (
      <kbd className={kbdClass} style={style}>
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';

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

export { Kbd, KbdCombination };
