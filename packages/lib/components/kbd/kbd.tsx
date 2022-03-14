import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, memo, useMemo } from 'react';
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

export { Kbd };
