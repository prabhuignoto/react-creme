import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './text.module.scss';

export type TextProps = {
  RTL?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const Text: FunctionComponent<TextProps> = ({
  size = 'sm',
  RTL = false,
  children,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const textClass = useMemo(
    () =>
      classNames(
        {
          [styles[size]]: true,
        },
        RTL ? styles.RTL : '',
        styles.container,
        isDarkMode ? styles.dark : ''
      ),
    []
  );

  return <p className={textClass}>{children}</p>;
};

export { Text };
