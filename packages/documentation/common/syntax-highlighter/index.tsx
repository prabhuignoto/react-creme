import { FunctionComponent, useMemo, useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light-async';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import tomorrowTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-bright';
import { useRecoilValue } from 'recoil';
import { Notification } from '../../../lib/components/notification/notification';
import { CopyIcon } from '../../../lib/icons';
import { themeState } from '../../atoms/home';
import './syntax-highlighter.scss';

interface CodeModel {
  code?: string;
  name?: string;
}

const wrapCode = (name?: string, code?: string) =>
  `import { ${name} } from "react-creme";\n\n${code}\n`;

const SyntaxHighLighter: FunctionComponent<CodeModel> = ({ code, name }) => {
  const [showNotification, setShowNotification] = useState(false);
  const theme = useRecoilValue(themeState);
  const syntaxTheme = useMemo(
    () => (theme.darkMode ? nightOwl : tomorrowTheme),
    [theme.darkMode]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code as string);
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
        language="javascript"
        customStyle={{ padding: '1.25rem' }}
        style={{ ...syntaxTheme, height: '100%' }}
        lineProps={{
          style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
        }}
        wrapLongLines
        wrapLines
      >
        {wrapCode(name, code)}
      </SyntaxHighlighter>
    </div>
  );
};

export { SyntaxHighLighter };
