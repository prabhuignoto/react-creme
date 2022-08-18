import classNames from 'classnames';
import React, { useMemo } from 'react';
import { InfoIcon } from '@common/icons';
import { isDark } from '@common/utils';
import styles from './block-quote.module.scss';

export interface BlockQuoteProps {
  children: React.ReactNode;
  showInfoIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

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
    []
  );

  return (
    <div className={blockQuoteClass}>
      <span className={styles.block_quote_icon}>
        {showInfoIcon && <InfoIcon />}
      </span>
      <div className={styles.block_quote_child_content}>{children}</div>
    </div>
  );
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
