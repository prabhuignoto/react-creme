import classNames from 'classnames';
import { CSSProperties, FunctionComponent, memo, useMemo } from 'react';
import { isDark } from '../common/utils';
import { KbdProps } from './kbd-model';
import styles from './kbd.module.scss';

const Kbd: FunctionComponent<KbdProps> = memo(
  ({ children, size = 'sm', buttonRaised = 'left', thickness = 2 }) => {
    const isDarkMode = isDark();

    const kbdClass = useMemo(
      () =>
        classNames(styles.wrapper, {
          [styles[`${size}`]]: true,
          [styles[`${buttonRaised}_raised`]]: true,
          [styles.dark]: isDarkMode,
        }),
      [size, buttonRaised, isDarkMode]
    );

    const style = useMemo(
      () =>
        ({
          '--rc-kbd-thickness': `${thickness}px`,
        }) as CSSProperties,
      [thickness]
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
