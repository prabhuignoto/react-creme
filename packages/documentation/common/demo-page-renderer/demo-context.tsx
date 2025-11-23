import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  FunctionComponent,
} from 'react';
import { useDemoState } from './hooks/use-demo-state';
import type {
  DemoContextValue,
  DemoContextState,
  DemoContextActions,
  ViewportSize,
  ThemeMode,
  CodePanelConfig,
} from './types';

/**
 * Demo Context - Central state management for demo page renderer
 *
 * Eliminates prop drilling by providing shared state and actions
 * to all child components via React Context.
 */

// Create context with undefined default (must be used within provider)
const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export interface DemoContextProviderProps {
  children: ReactNode;
  /** Initial active variant ID */
  defaultVariant?: string;
  /** Initial code panel configuration */
  initialCodePanel?: Partial<CodePanelConfig>;
  /** Initial viewport size */
  defaultViewport?: ViewportSize;
  /** Initial theme mode */
  defaultTheme?: ThemeMode;
}

/**
 * DemoContextProvider - Wraps demo page with state management
 *
 * @example
 * ```tsx
 * <DemoContextProvider defaultVariant="default">
 *   <DemoPageRenderer variants={variants} />
 * </DemoContextProvider>
 * ```
 */
export const DemoContextProvider: FunctionComponent<DemoContextProviderProps> = ({
  children,
  defaultVariant = '',
  initialCodePanel = {},
  defaultViewport = 'desktop',
  defaultTheme = 'auto',
}) => {
  // State
  // Use persistent state with localStorage
  const [activeVariant, setActiveVariant] = useDemoState<string>({
    storageKey: 'demo-active-variant',
    initialState: defaultVariant,
    persist: true,
  });

  const [codePanel, setCodePanel] = useDemoState<CodePanelConfig>({
    storageKey: 'demo-code-panel',
    initialState: {
      isOpen: false,
      width: 600,
      minWidth: 300,
      maxWidth: 1000,
      defaultTab: 'code',
      ...initialCodePanel,
    },
    persist: true,
  });

  const [viewportSize, setViewportSize] = useDemoState<ViewportSize>({
    storageKey: 'demo-viewport-size',
    initialState: defaultViewport,
    persist: true,
  });

  const [themeMode, setThemeMode] = useDemoState<ThemeMode>({
    storageKey: 'demo-theme-mode',
    initialState: defaultTheme,
    persist: true,
  });

  const [isFullscreen, setIsFullscreen] = useState(false); // Don't persist fullscreen

  // Actions - all memoized with stable dependencies
  const toggleCodePanel = useCallback(() => {
    setCodePanel((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, [setCodePanel]);

  const setCodePanelWidth = useCallback((width: number) => {
    setCodePanel((prev) => ({ ...prev, width }));
  }, [setCodePanel]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setThemeMode]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const resetDemo = useCallback(() => {
    // Reset to initial state
    setActiveVariant(defaultVariant);
    setCodePanel({
      isOpen: false,
      width: 600,
      minWidth: 300,
      maxWidth: 1000,
      defaultTab: 'code',
      ...initialCodePanel,
    });
    setViewportSize(defaultViewport);
    setThemeMode(defaultTheme);
    setIsFullscreen(false);
  }, [defaultVariant, initialCodePanel, defaultViewport, defaultTheme, setActiveVariant, setCodePanel, setViewportSize, setThemeMode]);

  const copyCode = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // Could dispatch a toast notification here
      console.log('Code copied to clipboard');
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }, []);

  // Context value - memoized to prevent unnecessary re-renders
  const state: DemoContextState = useMemo(
    () => ({
      activeVariant,
      codePanel,
      viewportSize,
      themeMode,
      isFullscreen,
    }),
    [activeVariant, codePanel, viewportSize, themeMode, isFullscreen]
  );

  const actions: DemoContextActions = useMemo(
    () => ({
      setActiveVariant,
      toggleCodePanel,
      setCodePanelWidth,
      setViewportSize,
      toggleTheme,
      toggleFullscreen,
      resetDemo,
      copyCode,
    }),
    [
      setActiveVariant,
      toggleCodePanel,
      setCodePanelWidth,
      setViewportSize,
      toggleTheme,
      toggleFullscreen,
      resetDemo,
      copyCode,
    ]
  );

  const value: DemoContextValue = useMemo(
    () => ({
      ...state,
      actions,
    }),
    [state, actions]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

/**
 * useDemoContext - Access demo context state and actions
 *
 * @throws {Error} If used outside DemoContextProvider
 *
 * @example
 * ```tsx
 * const { activeVariant, actions } = useDemoContext();
 * actions.setActiveVariant('large');
 * ```
 */
export const useDemoContext = (): DemoContextValue => {
  const context = useContext(DemoContext);

  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoContextProvider');
  }

  return context;
};

/**
 * Optional: Separate hooks for specific concerns
 */

/**
 * useActiveVariant - Access and update active variant
 */
export const useActiveVariant = () => {
  const { activeVariant, actions } = useDemoContext();
  return [activeVariant, actions.setActiveVariant] as const;
};

/**
 * useCodePanel - Access and control code panel
 */
export const useCodePanelState = () => {
  const { codePanel, actions } = useDemoContext();
  return {
    ...codePanel,
    toggle: actions.toggleCodePanel,
    setWidth: actions.setCodePanelWidth,
  };
};

/**
 * useViewport - Access and control viewport size
 */
export const useViewport = () => {
  const { viewportSize, actions } = useDemoContext();
  return [viewportSize, actions.setViewportSize] as const;
};

/**
 * useTheme - Access and control theme mode
 */
export const useThemeMode = () => {
  const { themeMode, actions } = useDemoContext();
  return [themeMode, actions.toggleTheme] as const;
};

/**
 * useDemoActions - Access all demo actions
 */
export const useDemoActions = () => {
  const { actions } = useDemoContext();
  return actions;
};
