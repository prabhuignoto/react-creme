import React, {
  Component,
  FunctionComponent,
  ReactNode,
  Suspense,
  lazy,
} from 'react';
import type { InteractiveDemo } from '../demo-page-renderer/types';
import './code-viewer.scss';

// Lazy load Sandpack for better initial load performance
const SandpackDemo = lazy(() => import('../sandpack-demo'));

export interface SandpackInteractiveProps {
  /** Interactive demo configuration */
  demo: InteractiveDemo;

  /** Custom height in pixels */
  height?: number;

  /** Optional CSS class name */
  className?: string;

  /** Show StackBlitz link in toolbar */
  showStackBlitzLink?: boolean;
}

/**
 * Error Boundary for Sandpack
 */
class SandpackErrorBoundary extends Component<
  { children: ReactNode; onRetry?: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; onRetry?: () => void }) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Sandpack Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ error: null, hasError: false });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="sandpack-error-boundary">
          <div className="sandpack-error-content">
            <h3>Failed to load playground</h3>
            <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={this.handleRetry}
              className="sandpack-error-retry-btn"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Loading fallback for Sandpack
 */
const SandpackLoading: FunctionComponent<{ height?: number }> = ({
  height,
}) => (
  <div
    className="sandpack-loading"
    style={{ minHeight: height ? `${height}px` : '400px' }}
  >
    <div className="sandpack-loading-spinner"></div>
    <span>Loading interactive playground...</span>
  </div>
);

/**
 * SandpackInteractive - Wrapper for Sandpack with error handling and loading states
 *
 * Features:
 * - Lazy loading for better performance
 * - Error boundary with retry
 * - Loading state
 * - StackBlitz link toolbar
 * - Consistent styling
 *
 * @example
 * ```tsx
 * <SandpackInteractive
 *   demo={{
 *     files: {
 *       "/App.tsx": `export default function App() { return <div>Hello</div> }`
 *     },
 *     template: "react-ts"
 *   }}
 *   height={500}
 *   showStackBlitzLink={true}
 * />
 * ```
 */
const SandpackInteractive: FunctionComponent<SandpackInteractiveProps> = ({
  demo,
  height = 500,
  className,
  showStackBlitzLink: _showStackBlitzLink = true,
}) => {
  // const stackBlitzUrl = demo.stackBlitzId
  //   ? `https://stackblitz.com/edit/${demo.stackBlitzId}`
  //   : null;

  return (
    <div className={`sandpack-interactive ${className || ''}`}>
      {/* Toolbar - Hidden for now */}
      {/* {showStackBlitzLink && stackBlitzUrl && (
        <div className="sandpack-toolbar">
          <a
            href={stackBlitzUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sandpack-toolbar-link"
          >
            <ExternalLink size={16} />
            <span>Open in External Editor</span>
          </a>
        </div>
      )} */}

      {/* Sandpack Content */}
      <SandpackErrorBoundary>
        <Suspense fallback={<SandpackLoading height={height} />}>
          <SandpackDemo
            stackBlitzId={demo.stackBlitzId}
            files={demo.files}
            template={demo.template}
            dependencies={demo.dependencies}
            options={{
              editorHeight: height,
              readOnly: false,
              showLineNumbers: true,
              showNavigator: false,
              showTabs: true,
            }}
          />
        </Suspense>
      </SandpackErrorBoundary>
    </div>
  );
};

SandpackInteractive.displayName = 'SandpackInteractive';

export { SandpackInteractive };
export default SandpackInteractive;
