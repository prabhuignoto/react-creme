/**
 * Code Viewer Components - Unified exports
 *
 * This module provides modular components for displaying code in documentation:
 * - ShikiCodeViewer: Accordion-style code viewer with syntax highlighting
 * - SandpackInteractive: Interactive code playground wrapper
 * - CodePanel: Unified interface combining both static code and playground
 */

export { ShikiCodeViewer } from './shiki-code-viewer';
export type { ShikiCodeViewerProps } from './shiki-code-viewer';

export { SandpackInteractive } from './sandpack-interactive';
export type { SandpackInteractiveProps } from './sandpack-interactive';

export { CodePanel } from './code-panel';
export type { CodePanelProps } from './code-panel';
