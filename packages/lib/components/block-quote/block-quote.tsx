import { InfoIcon } from '@icons';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './block-quote.module.scss';

interface BlockQuoteProps {
  children: React.ReactNode;
  showInfoIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BlockQuote: React.FC<BlockQuoteProps> = React.memo(
  ({ children, showInfoIcon = true, size = 'sm' }) => {
    const blockQuoteClass = useMemo(
      () =>
        classNames(styles.block_quote, styles[`block_quote_${size}`], {
          [styles.dark]: isDark(),
        }),
      [size]
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
  }
);

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
