import { useEffect, useCallback, useRef } from 'react';
import type { KeyboardShortcut } from '../types';

/**
 * Default keyboard shortcuts configuration
 */
export const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  {
    action: 'copy-code',
    description: 'Copy the current code snippet to clipboard',
    key: 'mod+c',
    label: 'Copy Code',
  },
  {
    action: 'toggle-code-panel',
    description: 'Show or hide the floating code panel',
    key: 'mod+k',
    label: 'Toggle Code Panel',
  },
  {
    action: 'open-stackblitz',
    description: 'Open the demo in StackBlitz',
    key: 'mod+o',
    label: 'Open in StackBlitz',
  },
  {
    action: 'reset-demo',
    description: 'Reset the demo to its initial state',
    key: 'mod+r',
    label: 'Reset Demo',
  },
  {
    action: 'fullscreen',
    description: 'Toggle fullscreen mode',
    key: 'mod+f',
    label: 'Fullscreen',
  },
];

export interface ShortcutHandlers {
  onCopyCode?: () => void;
  onToggleCode?: () => void;
  onOpenStackBlitz?: () => void;
  onReset?: () => void;
  onFullscreen?: () => void;
}

interface UseDemoShortcutsOptions {
  /** Custom shortcuts configuration */
  shortcuts?: KeyboardShortcut[];
  /** Disable shortcuts */
  enabled?: boolean;
  /** Handlers for each action */
  handlers: ShortcutHandlers;
}

/**
 * Check if the key combination matches the shortcut
 * Supports 'mod' for Cmd (Mac) / Ctrl (Windows/Linux)
 */
const matchesShortcut = (event: KeyboardEvent, shortcut: string): boolean => {
  const parts = shortcut.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);

  // Check key match
  if (event.key.toLowerCase() !== key) {
    return false;
  }

  // Check modifiers
  const hasCtrl = modifiers.includes('ctrl') || modifiers.includes('mod');
  const hasMeta =
    modifiers.includes('meta') ||
    (modifiers.includes('mod') && navigator.platform.includes('Mac'));
  const hasShift = modifiers.includes('shift');
  const hasAlt = modifiers.includes('alt');

  return (
    (hasCtrl ? event.ctrlKey : !event.ctrlKey || hasMeta) &&
    (hasMeta ? event.metaKey : !event.metaKey || hasCtrl) &&
    (hasShift ? event.shiftKey : !event.shiftKey) &&
    (hasAlt ? event.altKey : !event.altKey)
  );
};

/**
 * useDemoShortcuts - Register global keyboard shortcuts for demo actions
 *
 * Features:
 * - Cross-platform (Cmd on Mac, Ctrl on Windows/Linux)
 * - Doesn't trigger when typing in input fields
 * - Prevents default browser behavior
 * - Returns active shortcuts for display
 *
 * @example
 * ```tsx
 * const shortcuts = useDemoShortcuts({
 *   handlers: {
 *     onCopyCode: () => copyToClipboard(code),
 *     onToggleCode: () => setCodePanelOpen(!isOpen),
 *     onReset: () => resetState(),
 *   }
 * });
 * ```
 */
export const useDemoShortcuts = ({
  shortcuts = DEFAULT_SHORTCUTS,
  enabled = true,
  handlers,
}: UseDemoShortcutsOptions): KeyboardShortcut[] => {
  const handlersRef = useRef(handlers);

  // Keep handlers ref up to date
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Check each shortcut
      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut.key)) {
          event.preventDefault();
          event.stopPropagation();

          const currentHandlers = handlersRef.current;

          // Execute the corresponding handler
          switch (shortcut.action) {
            case 'copy-code':
              currentHandlers.onCopyCode?.();
              break;
            case 'toggle-code-panel':
              currentHandlers.onToggleCode?.();
              break;
            case 'open-stackblitz':
              currentHandlers.onOpenStackBlitz?.();
              break;
            case 'reset-demo':
              currentHandlers.onReset?.();
              break;
            case 'fullscreen':
              currentHandlers.onFullscreen?.();
              break;
          }

          break;
        }
      }
    },
    [shortcuts]
  );

  // Register/unregister keyboard event listener
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);

  return shortcuts;
};

/**
 * Get display label for keyboard shortcut based on platform
 */
export const getShortcutLabel = (shortcut: string): string => {
  const isMac = navigator.platform.includes('Mac');
  return shortcut
    .replace('mod', isMac ? '⌘' : 'Ctrl')
    .replace('ctrl', 'Ctrl')
    .replace('meta', '⌘')
    .replace('shift', '⇧')
    .replace('alt', isMac ? '⌥' : 'Alt')
    .split('+')
    .map(key => key.charAt(0).toUpperCase() + key.slice(1))
    .join(isMac ? '' : '+');
};
