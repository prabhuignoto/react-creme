import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './block-quote.module.scss';

export interface BlockQuoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  /**
   * Alignment of the blockquote
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center';

  /**
   * Citation text to be displayed
   */
  cite?: string;

  /**
   * Style of the blockquote
   * @default 'default'
   */
  blockquoteStyle?: 'default' | 'simple' | 'fancy';
}

/**
 * BlockQuote component for displaying quoted content
 */
export const BlockQuote: React.FC<BlockQuoteProps> = ({
  children,
  cite,
  align = 'left',
  blockquoteStyle = 'default',
  className,
  ...rest
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const blockQuoteClass = useMemo(
    () =>
      classNames(
        styles.quote,
        styles[`quote_${align}`],
        styles[`quote_${blockquoteStyle}`],
        {
          [styles.dark]: isDarkMode,
        },
        className
      ),
    [align, blockquoteStyle, isDarkMode, className]
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
