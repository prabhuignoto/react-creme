import React, { ReactNode } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { SyntaxHighLighter } from "./syntax-highlighter";

const Code: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SyntaxHighLighter
      code={reactElementToJSXString(children, {
        showDefaultProps: true,
        maxInlineAttributesLineLength: 550,
        useBooleanShorthandSyntax: true,
        tabStop: 4,
        sortProps: true,
        showFunctions: true,
      })}
    ></SyntaxHighLighter>
  );
};

export { Code };
