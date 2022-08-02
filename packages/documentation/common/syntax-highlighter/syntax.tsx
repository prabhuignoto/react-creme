import { ReactNode } from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { SyntaxHighLighter } from '.';

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
  code?: string;
  name?: string;
}> = ({ children, code, name }) => {
  return code ? (
    <SyntaxHighLighter code={code} name={name}></SyntaxHighLighter>
  ) : (
    <SyntaxHighLighter
      code={jsxToString(children, jsxToStringOptions)}
      name={name}
    ></SyntaxHighLighter>
  );
};

export { Code };
