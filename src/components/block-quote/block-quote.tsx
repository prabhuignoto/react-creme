import React from "react";
import "./block-quote.scss";

interface BlockQuoteProps {
  children: React.ReactNode;
}

const BlockQuote: React.FC<BlockQuoteProps> = ({ children }) => {
  return <div className="rc-block-quote">{children}</div>;
};

export { BlockQuote };
