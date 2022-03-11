import React, { useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light-async';
import atom from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import { useRecoilValue } from 'recoil';
import { Notification } from '../../../lib/components/notification/notification';
import { CopyIcon } from '../../../lib/icons';
import { themeState } from '../../atoms/home';
import './syntax-highlighter.scss';

interface CodeModel {
  code?: string;
}

const SyntaxHighLighter: React.FunctionComponent<CodeModel> = ({ code }) => {
  const [showNotification, setShowNotification] = React.useState(false);
  const theme = useRecoilValue(themeState);
  const syntaxTheme = useMemo(
    () => (theme.darkMode ? atom : nightOwl),
    [theme.darkMode]
  );

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
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export { SyntaxHighLighter };
