import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { Code, ChevronDown } from 'react-feather';
import { SyntaxHighLighter } from '../syntax-highlighter';
import './inline-code-viewer.scss';

export interface InlineCodeViewerProps {
  /** Code to display */
  code: string;

  /** Programming language for syntax highlighting */
  language?: string;

  /** File name to display */
  fileName?: string;

  /** Component name for import statement */
  componentName?: string;

  /** Show line numbers */
  showLineNumbers?: boolean;

  /** Label for the toggle button */
  label?: string;

  /** Optional CSS class name */
  className?: string;

  /** Callback when expanded state changes */
  onToggle?: (expanded: boolean) => void;
}

/**
 * InlineCodeViewer - Inline expandable code viewer for section footers
 *
 * Features:
 * - Toggle button at bottom-center of section
 * - Expands inline to show code (accordion-style)
 * - Syntax highlighting with Shiki
 * - Auto-adds import statement if componentName provided
 * - Smooth animations
 * - Compact design
 *
 * @example
 * ```tsx
 * <Section
 *   title="Example"
 *   footer={
 *     <InlineCodeViewer
 *       code="<Button>Click me</Button>"
 *       componentName="Button"
 *       language="tsx"
 *     />
 *   }
 * >
 *   <Button>Click me</Button>
 * </Section>
 * ```
 */
const InlineCodeViewer: FunctionComponent<InlineCodeViewerProps> = ({
  code,
  language = 'tsx',
  fileName,
  componentName,
  showLineNumbers = true,
  label,
  className,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle?.(newState);
  };

  // Add import statement if componentName is provided
  const fullCode = componentName
    ? `import { ${componentName} } from "react-creme";\n\n${code}`
    : code;

  const toggleLabel = label || (isExpanded ? 'Hide Code' : 'Show Code');
  const displayFileName = fileName || (componentName ? `${componentName}.tsx` : undefined);

  return (
    <div className={classNames('inline-code-viewer', className)}>
      {/* Toggle Button (centered at bottom of section) */}
      <button
        className={classNames('inline-code-viewer__toggle', {
          'is-expanded': isExpanded,
        })}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls="inline-code-content"
        type="button"
      >
        <Code className="inline-code-viewer__icon" size={16} />
        <span className="inline-code-viewer__label">{toggleLabel}</span>
        <ChevronDown
          size={16}
          className={classNames('inline-code-viewer__chevron', {
            'is-expanded': isExpanded,
          })}
        />
      </button>

      {/* Expandable Code Content */}
      <div
        id="inline-code-content"
        className={classNames('inline-code-viewer__content', {
          'is-expanded': isExpanded,
        })}
        aria-hidden={!isExpanded}
      >
        <div className="inline-code-viewer__content-inner">
          <SyntaxHighLighter
            code={fullCode}
            language={language}
            showLineNumbers={showLineNumbers}
            fileName={displayFileName}
            showCopyButton={true}
          />
        </div>
      </div>
    </div>
  );
};

InlineCodeViewer.displayName = 'InlineCodeViewer';

export { InlineCodeViewer };
export default InlineCodeViewer;
