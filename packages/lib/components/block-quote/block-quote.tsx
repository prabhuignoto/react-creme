import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './block-quote.module.scss';

export interface BlockQuoteProps {
  /**
   * Content to be rendered inside the blockquote
   */
  children: React.ReactNode;

  /**
   * Citation text to be displayed
   */
  cite?: string;

  /**
   * Alignment of the blockquote
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center';

  /**
   * Style of the blockquote
   * @default 'default'
   */
  style?: 'default' | 'simple' | 'fancy';

  /**
   * Additional class name for the blockquote
   */
  className?: string;

  /**
   * Additional props to be spread to the blockquote element
   */
  [key: string]: any;
}

/**
 * BlockQuote component for displaying quoted content
 */
export const BlockQuote: React.FC<BlockQuoteProps> = ({
  children,
  cite,
  align = 'left',
  style = 'default',
  className,
  ...rest
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const blockQuoteClass = useMemo(
    () =>
      classNames(
        styles.quote,
        styles[`quote_${align}`],
        styles[`quote_${style}`],
        {
          [styles.dark]: isDarkMode,
        },
        className
      ),
    [align, style, isDarkMode, className]
  );

  return (
    <blockquote className={blockQuoteClass} {...rest}>
      <div className={styles.content}>{children}</div>
      {cite && (
        <footer className={styles.cite}>
          <cite>— {cite}</cite>
        </footer>
      )}
    </blockquote>
  );
};

BlockQuote.displayName = 'BlockQuote';
