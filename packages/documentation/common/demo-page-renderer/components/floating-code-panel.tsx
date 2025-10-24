import { FunctionComponent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { X } from 'react-feather';
import { CodePanel } from '../../code-viewer';
import type { CodeSnippet, InteractiveDemo } from '../types';
import './floating-code-panel.scss';

export interface FloatingCodePanelProps {
  /** Whether the panel is open */
  isOpen: boolean;

  /** Callback when panel is closed */
  onClose: () => void;

  /** Code snippet to display */
  snippet: CodeSnippet;

  /** Optional interactive demo */
  interactive?: InteractiveDemo;

  /** Panel width in pixels */
  width?: number;

  /** Minimum width in pixels */
  minWidth?: number;

  /** Maximum width in pixels */
  maxWidth?: number;

  /** Callback when width changes (for resizing) */
  onResize?: (width: number) => void;

  /** Show line numbers in code view */
  showLineNumbers?: boolean;

  /** Optional CSS class name */
  className?: string;
}

/**
 * FloatingCodePanel - Dockable side panel for code viewing
 *
 * Features:
 * - Fixed position on right side
 * - Doesn't push main content
 * - Resizable width with drag handle
 * - Smooth slide in/out animations
 * - Sticky header with close button
 * - Contains CodePanel (Shiki + Sandpack)
 * - Escape key to close
 * - Click outside to close
 *
 * @example
 * ```tsx
 * <FloatingCodePanel
 *   isOpen={isPanelOpen}
 *   onClose={() => setPanelOpen(false)}
 *   snippet={{
 *     code: "const x = 10;",
 *     language: "typescript"
 *   }}
 *   width={600}
 *   onResize={(newWidth) => setWidth(newWidth)}
 * />
 * ```
 */
const FloatingCodePanel: FunctionComponent<FloatingCodePanelProps> = ({
  isOpen,
  onClose,
  snippet,
  interactive,
  width = 600,
  minWidth = 300,
  maxWidth = 1000,
  onResize,
  showLineNumbers = true,
  className,
}) => {
  const [currentWidth, setCurrentWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const [currentCode, setCurrentCode] = useState(snippet);
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  // Update code from sessionStorage when panel opens
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const storedCode = sessionStorage.getItem('demo-current-code');
      const storedComponent = sessionStorage.getItem('demo-current-component');

      if (storedCode) {
        const codeWithImport = storedComponent
          ? `import { ${storedComponent} } from "react-creme";\n\n${storedCode}`
          : storedCode;

        setCurrentCode({
          code: codeWithImport,
          language: 'tsx',
          fileName: storedComponent ? `${storedComponent}.tsx` : 'example.tsx',
        });
      } else {
        // Fallback to prop-based snippet
        setCurrentCode(snippet);
      }
    }
  }, [isOpen, snippet]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle resize
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setCurrentWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      onResize?.(currentWidth);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, currentWidth, minWidth, maxWidth, onResize]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="floating-code-panel__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={classNames('floating-code-panel', className, {
          'is-open': isOpen,
          'is-resizing': isResizing,
        })}
        style={{ width: `${currentWidth}px` }}
        role="dialog"
        aria-modal="true"
        aria-label="Code Panel"
      >
        {/* Resize Handle */}
        <div
          ref={resizeHandleRef}
          className="floating-code-panel__resize-handle"
          onMouseDown={handleResizeStart}
          role="separator"
          aria-label="Resize panel"
          aria-orientation="vertical"
        >
          <div className="floating-code-panel__resize-handle-bar" />
        </div>

        {/* Header */}
        <div className="floating-code-panel__header">
          <h3 className="floating-code-panel__title">Code</h3>
          <button
            className="floating-code-panel__close"
            onClick={onClose}
            aria-label="Close code panel"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="floating-code-panel__content">
          <CodePanel
            snippet={currentCode}
            interactive={interactive}
            showLineNumbers={showLineNumbers}
            defaultTab="code"
          />
        </div>
      </div>
    </>
  );
};

FloatingCodePanel.displayName = 'FloatingCodePanel';

export { FloatingCodePanel };
export default FloatingCodePanel;
