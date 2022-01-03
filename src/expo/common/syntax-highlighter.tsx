import React from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Notification } from "../../components/notification/notification";
import { CopyIcon } from "../../icons";
import "./syntax-highlighter.scss";

interface CodeModel {
  code?: string;
}

const SyntaxHighLighter: React.FunctionComponent<CodeModel> = ({ code }) => {
  const [showNotification, setShowNotification] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setShowNotification(true);
  };

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className="rc-demo-code-block" ref={ref}>
      {showNotification && (
        <Notification
          position="top-center"
          autoClose={1000}
          onClose={() => setShowNotification(false)}
          containedToParent={ref}
          disableHeader
          width={80}
          height={30}
        >
          <span style={{ padding: "0.5rem" }}>Copied</span>
        </Notification>
      )}
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

export { SyntaxHighLighter };
