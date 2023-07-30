import { InfoIcon } from '@icons';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './block-quote.module.scss';

export interface BlockQuoteProps {
  children: React.ReactNode;
  showInfoIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * BlockQuote Component - Encapsulates content inside a stylized blockquote.
 *
 * @component
 *
 * @param {ReactNode} props.children - The content to be rendered inside the blockquote
 * @param {boolean} props.showInfoIcon - Determines if the InfoIcon should be displayed (default: true)
 * @param {'sm'|'md'|'lg'} props.size - The size of the blockquote (small by default)
 *
 * @returns {ReactNode} React component
 */
const BlockQuote: React.FC<BlockQuoteProps> = ({
  children,
  showInfoIcon = true,
  size = 'sm',
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const blockQuoteClass = useMemo(
    () =>
      classNames(styles.block_quote, {
        [styles[`block_quote_${size}`]]: size,
        [styles.dark]: isDarkMode,
      }),
    [size, isDarkMode]
  );

  return (
    <div className={blockQuoteClass}>
      {showInfoIcon && (
        <span className={styles.block_quote_icon}>
          <InfoIcon />
        </span>
      )}
      <div className={styles.block_quote_child_content}>{children}</div>
    </div>
  );
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
