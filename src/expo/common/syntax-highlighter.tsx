import React from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyIcon } from "../../icons";
import "./syntax-highlighter.scss";

interface CodeModel {
  code?: string;
}

const Code: React.FunctionComponent<CodeModel> = ({ code }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="rc-demo-code-block">
      <span
        className="rc-demo-code-copy-btn"
        role="button"
        onClick={handleCopy}
      >
        <CopyIcon />
      </span>
      <SyntaxHighlighter
        language="typescript"
        style={{ ...a11yDark, height: "100%" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export { Code };
