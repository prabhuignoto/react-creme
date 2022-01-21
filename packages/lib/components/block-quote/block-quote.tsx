import React from 'react';
import './block-quote.scss';

export interface BlockQuoteProps {
  children: React.ReactNode;
}

const BlockQuote: React.FC<BlockQuoteProps> = ({ children }) => {
  return <div className="rc-block-quote">{children}</div>;
};

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
