/**
 * Custom Hooks for Demo Page Renderer
 */

// Re-export context hooks
export {
  useDemoContext,
  useActiveVariant,
  useCodePanelState,
  useViewport,
  useThemeMode,
  useDemoActions,
} from '../demo-context';

// Demo shortcuts
export { useDemoShortcuts, getShortcutLabel, DEFAULT_SHORTCUTS } from './use-demo-shortcuts';
export type { ShortcutHandlers } from './use-demo-shortcuts';

// Demo state with persistence
export {
  useDemoState,
  useCodePanelPreferences,
  useViewportPreference,
  useThemePreference,
  clearAllDemoPreferences,
} from './use-demo-state';
export type { DemoStateConfig } from './use-demo-state';
