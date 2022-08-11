import { FunctionComponent, useMemo, useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
// import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-dark';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
// import tomorrowTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-bright';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import { useRecoilValue } from 'recoil';
import { Notification } from '../../../lib/components/notification/notification';
import { CopyIcon } from '../../../lib/icons';
import { themeState } from '../../atoms/home';
import './syntax-highlighter.scss';

interface CodeModel {
  code?: string;
  name?: string;
  wrap?: boolean;
}

const wrapCode = (name?: string, code?: string) =>
  `import { ${name} } from "react-creme";\n\n${code}\n`;

const SyntaxHighLighter: FunctionComponent<CodeModel> = ({
  code,
  wrap = true,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const theme = useRecoilValue(themeState);
  const syntaxTheme = useMemo(
    () => (theme.darkMode ? dark : light),
    [theme.darkMode]
  );

  const codeString = useMemo(() => (wrap ? wrapCode(code) : code), []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setShowNotification(true);
  };

  const ref = useRef<HTMLDivElement>(null);

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
          <span style={{ padding: '0.5rem' }}>Copied</span>
        </Notification>
      )}
      <span
        className="rc-demo-code-copy-btn"
        role="button"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        <CopyIcon />
      </span>
      <SyntaxHighlighter
        language="jsx"
        // customStyle={{ padding: '1.25rem' }}
        style={{ ...syntaxTheme, height: '100%' }}
        lineProps={{
          style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
        }}
        // wrapLongLines
        wrapLines
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export { SyntaxHighLighter };
