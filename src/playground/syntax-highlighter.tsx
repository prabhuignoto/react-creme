import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeModel {
  code?: string;
}

const Code: React.FunctionComponent<CodeModel> = ({ code }) => {
  return (
    <div>
      <SyntaxHighlighter language="typescript" style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export { Code };
