import React, { ReactNode } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { SyntaxHighLighter } from "./syntax-highlighter";

const Code: React.FunctionComponent<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <SyntaxHighLighter
      code={reactElementToJSXString(children, {
        maxInlineAttributesLineLength: 950,
        showDefaultProps: true,
        showFunctions: true,
        sortProps: true,
        tabStop: 4,
        useBooleanShorthandSyntax: true,
      })}
    ></SyntaxHighLighter>
  );
};

export { Code };
