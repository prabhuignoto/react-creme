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
      {showInfoIcon && (
        <span className="rc-block-quote-icon">
          <InfoIcon />
        </span>
      )}
      {children}
    </div>
  );
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
