import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Storage quota monitoring utility
 */
// const checkStorageQuota = async (): Promise<{ available: number; total: number } | null> => {
//   if (!navigator.storage?.estimate) {
//     return null;
//   }

//   try {
//     const estimate = await navigator.storage.estimate();
//     return {
//       available: Math.max(0, estimate.quota - estimate.usage),
//       total: estimate.quota || 0,
//     };
//   } catch {
//     return null;
//   }
// };

/**
 * Safe localStorage write with quota checking
 */
const safeStorageWrite = (key: string, value: string): boolean => {
  try {
    // const currentItem = localStorage.getItem(key);
    // const newSize = new Blob([value]).size;
    // const oldSize = currentItem ? new Blob([currentItem]).size : 0;
    // const sizeDifference = newSize - oldSize;

    // Attempt to write
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      // QuotaExceededError - storage is full
      console.warn(
        `localStorage quota exceeded for key "${key}". Clearing oldest demo preferences...`
      );
      // Clear oldest preference to make space
      const demoKeys = [
        'demo-code-panel-prefs',
        'demo-viewport-pref',
        'demo-theme-pref',
      ];
      for (const demoKey of demoKeys) {
        if (demoKey !== key) {
          try {
            localStorage.removeItem(demoKey);
            // Retry the write after clearing
            localStorage.setItem(key, value);
            return true;
          } catch {
            continue;
          }
        }
      }
      console.error(`Failed to save to localStorage: quota exceeded`);
      return false;
    }
    console.error(`Failed to save state to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Configuration for demo state persistence
 */
export interface DemoStateConfig<T> {
  /** Unique key for localStorage */
  storageKey: string;
  /** Initial state value */
  initialState: T;
  /** Whether to persist to localStorage */
  persist?: boolean;
  /** Custom serializer */
  serialize?: (value: T) => string;
  /** Custom deserializer */
  deserialize?: (value: string) => T;
}

/**
 * useDemoState - State management with localStorage persistence
 *
 * Features:
 * - Automatic localStorage sync
 * - Custom serialization/deserialization
 * - Reset to initial state
 * - Cross-tab synchronization
 *
 * @example
 * ```tsx
 * const [state, setState, reset] = useDemoState({
 *   storageKey: 'demo-button-state',
 *   initialState: { count: 0, color: 'blue' },
 *   persist: true,
 * });
 *
 * setState({ ...state, count: state.count + 1 });
 * reset(); // Back to { count: 0, color: 'blue' }
 * ```
 */
export const useDemoState = <T>({
  storageKey,
  initialState,
  persist = true,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: DemoStateConfig<T>): [
  T,
  (value: T | ((prev: T) => T)) => void,
  () => void,
] => {
  // Store serialize/deserialize in refs to avoid re-render triggers
  const serializeRef = useRef(serialize);
  const deserializeRef = useRef(deserialize);

  // Update refs when functions change (rare)
  useEffect(() => {
    serializeRef.current = serialize;
    deserializeRef.current = deserialize;
  }, [serialize, deserialize]);

  // Initialize state from localStorage or initial value
  const [state, setState] = useState<T>(() => {
    if (!persist || typeof window === 'undefined') {
      return initialState;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return deserializeRef.current(stored);
      }
    } catch (error) {
      console.error(
        `Failed to load state from localStorage (${storageKey}):`,
        error
      );
    }

    return initialState;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!persist || typeof window === 'undefined') return;

    const serialized = serializeRef.current(state);
    safeStorageWrite(storageKey, serialized);
  }, [state, storageKey, persist]); // Removed serialize from dependencies

  // Listen for storage events (cross-tab synchronization)
  useEffect(() => {
    if (!persist || typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          setState(deserializeRef.current(e.newValue));
        } catch (error) {
          console.error(
            `Failed to sync state from storage event (${storageKey}):`,
            error
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey, persist]); // Removed deserialize from dependencies

  // Reset to initial state
  const reset = useCallback(() => {
    setState(initialState);

    if (persist && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.error(
          `Failed to remove state from localStorage (${storageKey}):`,
          error
        );
      }
    }
  }, [initialState, persist, storageKey]);

  return [state, setState, reset];
};

/**
 * useCodePanelPreferences - Persist code panel preferences
 */
export const useCodePanelPreferences = () => {
  return useDemoState({
    initialState: {
      defaultTab: 'code' as 'code' | 'playground',
      isOpen: false,
      showLineNumbers: true,
      width: 600,
    },
    persist: true,
    storageKey: 'demo-code-panel-prefs',
  });
};

/**
 * useViewportPreference - Persist viewport size preference
 */
export const useViewportPreference = () => {
  return useDemoState({
    initialState: 'desktop' as 'mobile' | 'tablet' | 'desktop' | 'fullscreen',
    persist: true,
    storageKey: 'demo-viewport-pref',
  });
};

/**
 * useThemePreference - Persist theme preference
 */
export const useThemePreference = () => {
  return useDemoState({
    initialState: 'auto' as 'light' | 'dark' | 'auto',
    persist: true,
    storageKey: 'demo-theme-pref',
  });
};

/**
 * Batch clear all demo preferences from localStorage
 */
export const clearAllDemoPreferences = () => {
  if (typeof window === 'undefined') return;

  const demoKeys = [
    'demo-code-panel-prefs',
    'demo-viewport-pref',
    'demo-theme-pref',
  ];

  demoKeys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
    }
  });
};
