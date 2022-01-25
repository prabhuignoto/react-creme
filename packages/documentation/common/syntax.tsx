import React, { ReactNode } from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { SyntaxHighLighter } from './syntax-highlighter';

export const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
  useFragmentWithSingleChildren: true,
};

const Code: React.FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <SyntaxHighLighter
      code={jsxToString(children, jsxToStringOptions)}
    ></SyntaxHighLighter>
  );
};

export { Code };
