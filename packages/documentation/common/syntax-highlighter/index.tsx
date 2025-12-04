import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { codeToHtml, bundledLanguages } from 'shiki';
import { useAtomValue } from 'jotai';
import classNames from 'classnames';
import { Notification } from '../../../lib/components/notification/notification';
import { CopyIcon } from '../../../lib/icons';
import { themeState } from '../../atoms/home';
import './syntax-highlighter.scss';
import type { SupportedLanguage } from '../demo-page-renderer/types';

interface CodeModel {
  /** The code string to highlight */
  code?: string;
  /** Component name (for wrapping with import statement) */
  name?: string;
  /** Whether to wrap code with import statement */
  wrap?: boolean;
  /** Programming language for syntax highlighting */
  language?: SupportedLanguage;
  /** Show line numbers (default: false) */
  showLineNumbers?: boolean;
  /** Line numbers to highlight (1-indexed) */
  highlightLines?: number[];
  /** Optional file name to display */
  fileName?: string;
  /** Optional CSS class name */
  className?: string;
  /** Show copy button (default: true) */
  showCopyButton?: boolean;
  /** Custom theme override ('light' | 'dark' | 'auto') */
  themeMode?: 'light' | 'dark' | 'auto';
}

const wrapCode = (name?: string, code?: string) =>
  `import { ${name} } from "react-creme";\n\n${code}\n`;

/**
 * Enhanced SyntaxHighlighter using Shiki (VS Code's highlighter)
 *
 * Features:
 * - High-quality syntax highlighting (VS Code themes)
 * - Line numbers support
 * - Line highlighting
 * - File name display
 * - Copy to clipboard
 * - Loading state
 * - Error handling with fallback
 * - Smaller bundle size than react-syntax-highlighter
 *
 * @example
 * ```tsx
 * <SyntaxHighLighter
 *   code="const x = 10;"
 *   language="typescript"
 *   showLineNumbers={true}
 *   highlightLines={[1, 2]}
 *   fileName="example.ts"
 * />
 * ```
 */
const SyntaxHighLighter: FunctionComponent<CodeModel> = ({
  code = '',
  wrap = true,
  name,
  language = 'tsx',
  showLineNumbers = false,
  highlightLines = [],
  fileName,
  className,
  showCopyButton = true,
  themeMode = 'auto',
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [highlightedHTML, setHighlightedHTML] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const theme = useAtomValue(themeState);
  const ref = useRef<HTMLDivElement>(null);

  // Choose theme based on mode
  const shikiTheme = useMemo(() => {
    if (themeMode === 'light') return 'one-light';
    if (themeMode === 'dark') return 'one-dark-pro';
    // auto mode - use theme state
    return theme.darkMode ? 'one-dark-pro' : 'one-light';
  }, [theme.darkMode, themeMode]);

  const codeString = useMemo(
    () => (wrap && name ? wrapCode(name, code) : code),
    [code, wrap, name]
  );

  // Memoize highlightLines to prevent array reference changes causing re-renders
  const memoizedHighlightLines = useMemo(
    () => highlightLines,
    [JSON.stringify(highlightLines)]
  );

  // Highlight code with Shiki
  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);

        // Check if language is supported
        const supportedLang = language in bundledLanguages ? language : 'tsx';

        const transformers = showLineNumbers
          ? [
              {
                line(
                  node: { properties: Record<string, unknown> },
                  line: number
                ) {
                  node.properties['data-line'] = line;

                  // Highlight specified lines
                  if (memoizedHighlightLines.includes(line)) {
                    node.properties.class = classNames(
                      node.properties.class,
                      'line-highlight'
                    );
                  }
                },
                name: 'line-numbers',
              },
            ]
          : [];

        const html = await codeToHtml(codeString, {
          lang: supportedLang,
          theme: shikiTheme,
          transformers,
        });

        setHighlightedHTML(html);
      } catch (error) {
        console.error('Shiki highlighting error:', error);
        // Fallback to plain code
        setHighlightedHTML(`<pre><code>${codeString}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    if (codeString) {
      highlightCode();
    }
  }, [
    codeString,
    language,
    shikiTheme,
    showLineNumbers,
    memoizedHighlightLines,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setShowNotification(true);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div
      className={classNames('rc-demo-code-block', className, {
        'has-file-name': !!fileName,
        'has-line-numbers': showLineNumbers,
      })}
      ref={ref}
    >
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

      {/* File name tab */}
      {fileName && (
        <div className="rc-demo-code-file-name">
          <span>{fileName}</span>
        </div>
      )}

      {/* Copy button */}
      {showCopyButton && (
        <button
          className="rc-demo-code-copy-btn"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          title="Copy code"
        >
          <CopyIcon />
        </button>
      )}

      {/* Code content */}
      {isLoading ? (
        <div className="rc-demo-code-loading">
          <div className="rc-demo-code-spinner"></div>
          <span>Highlighting code...</span>
        </div>
      ) : (
        <div
          className={classNames('rc-demo-code-content', {
            'with-line-numbers': showLineNumbers,
          })}
          dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        />
      )}
    </div>
  );
};

export { SyntaxHighLighter };
export type { CodeModel };
