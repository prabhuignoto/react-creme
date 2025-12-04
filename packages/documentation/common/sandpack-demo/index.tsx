import { FunctionComponent, useMemo } from 'react';
import { Sandpack, SandpackFiles } from '@codesandbox/sandpack-react';
import { useAtomValue } from 'jotai';
import { themeState } from '../../atoms/home';
import './sandpack-demo.scss';

interface SandpackDemoProps {
  /**
   * StackBlitz project ID (for backward compatibility)
   * Will be used to import from StackBlitz
   */
  stackBlitzId?: string;

  /**
   * Sandpack files object (for code-based demos)
   * Takes precedence over stackBlitzId
   */
  files?: SandpackFiles;

  /**
   * Template to use (react, react-ts, vanilla, etc.)
   * @default 'react-ts'
   */
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts';

  /**
   * Custom dependencies to include
   */
  dependencies?: Record<string, string>;

  /**
   * Show/hide specific UI elements
   */
  options?: {
    showNavigator?: boolean;
    showTabs?: boolean;
    showLineNumbers?: boolean;
    editorHeight?: number | string;
    readOnly?: boolean;
  };
}

/**
 * Modern SandpackDemo component using CodeSandbox's Sandpack
 *
 * Features:
 * - Better customization than StackBlitz
 * - Matches site theme (dark/light mode)
 * - Lighter bundle size
 * - Built-in loading states
 * - Supports both StackBlitz imports and code-based demos
 */
const SandpackDemo: FunctionComponent<SandpackDemoProps> = ({
  stackBlitzId,
  files,
  template = 'react-ts',
  dependencies = {},
  options = {},
}) => {
  const theme = useAtomValue(themeState);

  // Choose Sandpack theme based on site theme
  const sandpackTheme = useMemo(
    () => (theme.darkMode ? 'dark' : 'light'),
    [theme.darkMode]
  );

  // Default options
  const {
    showNavigator = false,
    showTabs = true,
    showLineNumbers = true,
    editorHeight = 400,
    readOnly = false,
  } = options;

  // If using code-based files
  if (files) {
    return (
      <div className="sandpack-demo-container">
        <Sandpack
          template={template}
          files={files}
          theme={sandpackTheme}
          options={{
            classes: {
              'sp-layout': 'sandpack-layout',
              'sp-wrapper': 'sandpack-wrapper',
            },
            editorHeight,
            readOnly,
            showLineNumbers,
            showNavigator,
            showTabs,
          }}
          customSetup={{
            dependencies: {
              'react-creme': 'latest',
              ...dependencies,
            },
          }}
        />
      </div>
    );
  }

  // Fallback: Show placeholder when only StackBlitz ID is provided
  // (Sandpack can't directly embed StackBlitz projects without file content)
  if (stackBlitzId || !files) {
    return (
      <div className="sandpack-demo-container">
        <div className="sandpack-placeholder">
          <div className="sandpack-placeholder-content">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: '1rem', opacity: 0.5 }}
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <h3>Interactive Playground</h3>
            <p>Interactive playgrounds will be available soon.</p>
            <p
              style={{
                fontSize: '0.875rem',
                marginTop: '0.5rem',
                opacity: 0.7,
              }}
            >
              For now, use the &quot;Show Code&quot; button in each example
              section to view the source code.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No files provided at all
  return (
    <div className="sandpack-demo-container">
      <div className="sandpack-error">
        <p>No demo configuration provided.</p>
      </div>
    </div>
  );
};

export default SandpackDemo;
export { SandpackDemo };
