import { FunctionComponent, useState } from 'react';
import { Copy, Check } from 'react-feather';
import { SyntaxHighLighter } from '../syntax-highlighter';
import './static-playground.scss';

export interface StaticPlaygroundProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
}

/**
 * StaticPlayground - Shows code examples with copy functionality
 *
 * A practical alternative to live playgrounds for libraries that require npm installation.
 * Shows comprehensive, production-ready code examples that users can copy and run locally.
 */
const StaticPlayground: FunctionComponent<StaticPlaygroundProps> = ({
  code,
  language = 'tsx',
  title = 'Interactive Example',
  description = 'Copy this example and run it in your project',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="static-playground">
      {/* Header */}
      <div className="static-playground__header">
        <div className="static-playground__header-content">
          <h3 className="static-playground__title">{title}</h3>
          <p className="static-playground__description">{description}</p>
        </div>
        <button
          className="static-playground__copy-button"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display */}
      <div className="static-playground__code">
        <SyntaxHighLighter
          code={code}
          language={language}
          showLineNumbers={true}
          showCopyButton={false}
        />
      </div>

      {/* Footer with instructions */}
      <div className="static-playground__footer">
        <div className="static-playground__instructions">
          <p className="static-playground__instructions-title">
            💡 To run this example:
          </p>
          <ol className="static-playground__instructions-list">
            <li>Install React Creme: <code>npm install react-creme</code></li>
            <li>Copy the code above into your project</li>
            <li>Import the CSS: <code>import 'react-creme/css'</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

StaticPlayground.displayName = 'StaticPlayground';

export { StaticPlayground };
export default StaticPlayground;
