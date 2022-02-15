import classNames from 'classnames';
import React, { useMemo } from 'react';
import { InfoIcon } from '../../icons';
import './block-quote.scss';

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
  const blockQuoteClass = useMemo(
    () =>
      classNames('rc-block-quote', {
        [`rc-block-quote-${size}`]: size,
      }),
    []
  );

  return (
    <div className={blockQuoteClass}>
      <span className="rc-block-quote-icon">
        {showInfoIcon && <InfoIcon />}
      </span>
      <div className="rc-block-quote-child-content">{children}</div>
    </div>
  );
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
