import { ReactNode } from 'react';
import { SandpackFiles } from '@codesandbox/sandpack-react';

/**
 * Supported programming languages for syntax highlighting
 */
export type SupportedLanguage =
  | 'tsx'
  | 'jsx'
  | 'typescript'
  | 'javascript'
  | 'css'
  | 'scss'
  | 'json'
  | 'html';

/**
 * Code snippet for static display with syntax highlighting
 */
export interface CodeSnippet {
  /** The source code to display */
  code: string;

  /** Programming language for syntax highlighting */
  language: SupportedLanguage;

  /** Optional file name to display */
  fileName?: string;

  /** Line numbers to highlight (1-indexed) */
  highlightLines?: number[];

  /** Optional label/description for the code */
  label?: string;
}

/**
 * Configuration for interactive code playground using Sandpack
 */
export interface InteractiveDemo {
  /** StackBlitz project ID (for backward compatibility) */
  stackBlitzId?: string;

  /** Sandpack files object for code-based demos (takes precedence over stackBlitzId) */
  files?: SandpackFiles;

  /** Sandpack template to use */
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts';

  /** Custom dependencies to include in the playground */
  dependencies?: Record<string, string>;

  /** Height of the playground in pixels */
  height?: number;
}

/**
 * A variant/example of a component with demo and code
 */
export interface ComponentVariant {
  /** Unique identifier for this variant */
  id: string;

  /** Display title for the variant */
  title: string;

  /** Optional description explaining what this variant demonstrates */
  description?: string;

  /** Code snippet for this variant */
  code: CodeSnippet;

  /** The actual demo component to render */
  demo: ReactNode;

  /** Optional interactive playground configuration */
  interactive?: InteractiveDemo;
}

/**
 * Component property metadata for documentation
 */
export interface PropertyMeta {
  /** Property name */
  name: string;

  /** TypeScript type */
  type: string;

  /** Default value if any */
  default?: string;

  /** Description of what this property does */
  description: string;

  /** Whether this property is required */
  required?: boolean;
}

/**
 * Callback/event handler metadata
 */
export interface CallbackMeta {
  /** Callback name */
  name: string;

  /** Function signature */
  signature: string;

  /** Description of when this callback is fired */
  description: string;

  /** Parameters the callback receives */
  parameters?: string;
}

/**
 * Theme mode for code display
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Viewport size for responsive preview
 */
export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'fullscreen';

/**
 * Quick action identifiers
 */
export type QuickAction =
  | 'copy-code'
  | 'toggle-code-panel'
  | 'open-stackblitz'
  | 'reset-demo'
  | 'fullscreen'
  | 'theme-toggle'
  | 'viewport-toggle';

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** Action identifier */
  action: QuickAction;

  /** Key combination (e.g., "Cmd+K" or "Ctrl+K") */
  key: string;

  /** Display label for the shortcut */
  label: string;

  /** Description of what the shortcut does */
  description: string;
}

/**
 * Configuration for the floating code panel
 */
export interface CodePanelConfig {
  /** Whether the panel is open */
  isOpen: boolean;

  /** Width of the panel in pixels */
  width: number;

  /** Minimum width allowed */
  minWidth?: number;

  /** Maximum width allowed */
  maxWidth?: number;

  /** Default tab to show */
  defaultTab?: 'code' | 'playground';
}

/**
 * Demo container controls configuration
 */
export interface DemoControls {
  /** Show theme toggle (light/dark background) */
  theme?: boolean;

  /** Show viewport size toggles */
  viewport?: boolean;

  /** Show fullscreen button */
  fullscreen?: boolean;

  /** Show reset button */
  reset?: boolean;
}

/**
 * Layout options for variant selector
 */
export type VariantLayout = 'grid' | 'list' | 'tabs';

/**
 * Props for the main DemoPageRenderer component
 */
export interface DemoPageRendererProps {
  /** Page title */
  title?: string;

  /** Page description */
  description?: string | ReactNode;

  /** Optional icon for the page header */
  pageIcon?: ReactNode;

  /** Component ID for generating source links */
  sourceId?: string;

  /** Documentation page ID for generating edit links */
  editId?: string;

  /** List of component features to highlight */
  features?: string[];

  /** Component variants to display */
  variants?: ComponentVariant[];

  /** Component properties metadata */
  properties?: PropertyMeta[];

  /** Component callbacks/events metadata */
  callbacks?: CallbackMeta[];

  /** Demo container controls */
  controls?: DemoControls;

  /** Default variant to show */
  defaultVariant?: string;
}

/**
 * Context state for demo page
 */
export interface DemoContextState {
  /** Active variant ID */
  activeVariant: string;

  /** Code panel configuration */
  codePanel: CodePanelConfig;

  /** Current viewport size */
  viewportSize: ViewportSize;

  /** Current theme mode */
  themeMode: ThemeMode;

  /** Whether demo is in fullscreen */
  isFullscreen: boolean;
}

/**
 * Context actions for demo page
 */
export interface DemoContextActions {
  /** Set active variant */
  setActiveVariant: (variantId: string) => void;

  /** Toggle code panel */
  toggleCodePanel: () => void;

  /** Set code panel width */
  setCodePanelWidth: (width: number) => void;

  /** Set viewport size */
  setViewportSize: (size: ViewportSize) => void;

  /** Toggle theme mode */
  toggleTheme: () => void;

  /** Toggle fullscreen */
  toggleFullscreen: () => void;

  /** Reset demo to initial state */
  resetDemo: () => void;

  /** Copy code to clipboard */
  copyCode: (code: string) => Promise<void>;
}

/**
 * Complete demo context value
 */
export interface DemoContextValue extends DemoContextState {
  actions: DemoContextActions;
}
