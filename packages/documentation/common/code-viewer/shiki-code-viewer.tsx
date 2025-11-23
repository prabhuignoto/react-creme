import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { ChevronDown } from 'react-feather';
import { SyntaxHighLighter } from '../syntax-highlighter';
import type { CodeSnippet } from '../demo-page-renderer/types';
import './code-viewer.scss';

export interface ShikiCodeViewerProps {
  /** Code snippet to display */
  snippet: CodeSnippet;

  /** Whether the code viewer is expanded by default */
  defaultExpanded?: boolean;

  /** Show line numbers */
  showLineNumbers?: boolean;

  /** Custom label for the accordion (defaults to "Show Code" / "Hide Code") */
  label?: string;

  /** Optional CSS class name */
  className?: string;

  /** Callback when expanded state changes */
  onToggle?: (expanded: boolean) => void;
}

/**
 * ShikiCodeViewer - Accordion-style code viewer with Shiki syntax highlighting
 *
 * Features:
 * - Expandable/collapsible accordion
 * - Shiki syntax highlighting
 * - Line numbers support
 * - Line highlighting
 * - File name display
 * - Copy to clipboard
 * - Smooth animations
 *
 * @example
 * ```tsx
 * <ShikiCodeViewer
 *   snippet={{
 *     code: "const x = 10;",
 *     language: "typescript",
 *     fileName: "example.ts"
 *   }}
 *   defaultExpanded={false}
 *   showLineNumbers={true}
 * />
 * ```
 */
const ShikiCodeViewer: FunctionComponent<ShikiCodeViewerProps> = ({
  snippet,
  defaultExpanded = false,
  showLineNumbers = false,
  label,
  className,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle?.(newState);
  };

  const toggleLabel = label || (isExpanded ? 'Hide Code' : 'Show Code');

  return (
    <div className={classNames('shiki-code-viewer', className)}>
      {/* Accordion Header */}
      <button
        className={classNames('shiki-code-viewer__toggle', {
          'is-expanded': isExpanded,
        })}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls="code-content"
        type="button"
      >
        <ChevronDown
          size={18}
          className={classNames('shiki-code-viewer__toggle-icon', {
            'is-expanded': isExpanded,
          })}
        />
        <span className="shiki-code-viewer__toggle-label">{toggleLabel}</span>
        {snippet.fileName && !isExpanded && (
          <span className="shiki-code-viewer__file-badge">
            {snippet.fileName}
          </span>
        )}
        {snippet.label && (
          <span className="shiki-code-viewer__label-badge">
            {snippet.label}
          </span>
        )}
      </button>

      {/* Accordion Content */}
      <div
        id="code-content"
        className={classNames('shiki-code-viewer__content', {
          'is-expanded': isExpanded,
        })}
        aria-hidden={!isExpanded}
      >
        <div className="shiki-code-viewer__content-inner">
          <SyntaxHighLighter
            code={snippet.code}
            language={snippet.language}
            showLineNumbers={showLineNumbers}
            highlightLines={snippet.highlightLines}
            fileName={snippet.fileName}
            showCopyButton={true}
          />
        </div>
      </div>
    </div>
  );
};

ShikiCodeViewer.displayName = 'ShikiCodeViewer';

export { ShikiCodeViewer };
export default ShikiCodeViewer;
