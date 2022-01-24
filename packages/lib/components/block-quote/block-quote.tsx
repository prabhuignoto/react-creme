import React from 'react';
import { InfoIcon } from '../../icons';
import './block-quote.scss';

export interface BlockQuoteProps {
  children: React.ReactNode;
  showInfoIcon?: boolean;
}

const BlockQuote: React.FC<BlockQuoteProps> = ({
  children,
  showInfoIcon = true,
}) => {
  return (
    <div className="rc-block-quote">
      <span className="rc-block-quote-icon">
        {showInfoIcon && <InfoIcon />}
      </span>
      <div className="rc-block-quote-child-content">{children}</div>
    </div>
  );
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
