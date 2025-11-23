import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { Code, Play } from 'react-feather';
import { ShikiCodeViewer } from './shiki-code-viewer';
import { SandpackInteractive } from './sandpack-interactive';
import type { CodeSnippet, InteractiveDemo } from '../demo-page-renderer/types';
import './code-viewer.scss';

export interface CodePanelProps {
  /** Code snippet for static display */
  snippet: CodeSnippet;

  /** Optional interactive demo configuration */
  interactive?: InteractiveDemo;

  /** Default tab to show ('code' | 'playground') */
  defaultTab?: 'code' | 'playground';

  /** Show line numbers in code view */
  showLineNumbers?: boolean;

  /** Playground height in pixels */
  playgroundHeight?: number;

  /** Optional CSS class name */
  className?: string;

  /** Callback when active tab changes */
  onTabChange?: (tab: 'code' | 'playground') => void;
}

/**
 * CodePanel - Unified interface for both static code (Shiki) and interactive playground (Sandpack)
 *
 * Features:
 * - Tabs: "Code" (Shiki) | "Playground" (Sandpack)
 * - Automatically detects if interactive demo is available
 * - Falls back to code-only if no Sandpack config
 * - Consistent UX for both modes
 * - Smooth tab transitions
 *
 * @example
 * ```tsx
 * <CodePanel
 *   snippet={{
 *     code: "const x = 10;",
 *     language: "typescript",
 *     fileName: "example.ts"
 *   }}
 *   interactive={{
 *     files: { "/App.tsx": "..." },
 *     template: "react-ts"
 *   }}
 *   defaultTab="code"
 *   showLineNumbers={true}
 * />
 * ```
 */
const CodePanel: FunctionComponent<CodePanelProps> = ({
  snippet,
  interactive,
  defaultTab = 'code',
  showLineNumbers = false,
  playgroundHeight = 500,
  className,
  onTabChange,
}) => {
  const hasInteractive = !!interactive;
  const [activeTab, setActiveTab] = useState<'code' | 'playground'>(
    hasInteractive ? defaultTab : 'code'
  );

  const handleTabChange = (tab: 'code' | 'playground') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // If no interactive demo, just show code viewer
  if (!hasInteractive) {
    return (
      <div className={classNames('code-panel', 'code-panel--code-only', className)}>
        <ShikiCodeViewer
          snippet={snippet}
          defaultExpanded={true}
          showLineNumbers={showLineNumbers}
        />
      </div>
    );
  }

  return (
    <div className={classNames('code-panel', className)}>
      {/* Tab Bar */}
      <div className="code-panel__tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'code'}
          aria-controls="code-panel-content"
          className={classNames('code-panel__tab', {
            'is-active': activeTab === 'code',
          })}
          onClick={() => handleTabChange('code')}
          type="button"
        >
          <Code size={16} />
          <span>Code</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'playground'}
          aria-controls="code-panel-content"
          className={classNames('code-panel__tab', {
            'is-active': activeTab === 'playground',
          })}
          onClick={() => handleTabChange('playground')}
          type="button"
        >
          <Play size={16} />
          <span>Playground</span>
        </button>
      </div>

      {/* Tab Content */}
      <div
        id="code-panel-content"
        className="code-panel__content"
        role="tabpanel"
      >
        {activeTab === 'code' ? (
          <div className="code-panel__code-view">
            <ShikiCodeViewer
              snippet={snippet}
              defaultExpanded={true}
              showLineNumbers={showLineNumbers}
            />
          </div>
        ) : (
          <div className="code-panel__playground-view">
            <SandpackInteractive
              demo={interactive}
              height={playgroundHeight}
              showStackBlitzLink={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

CodePanel.displayName = 'CodePanel';

export { CodePanel };
export default CodePanel;
