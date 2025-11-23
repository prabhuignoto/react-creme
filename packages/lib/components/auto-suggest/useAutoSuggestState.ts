import { useCallback, useReducer } from 'react';

/**
 * Represents a selected item in the state
 */
export interface SelectedItem {
  id: string;
  name: string;
  value: string;
}

/**
 * State shape for AutoSuggest reducer
 */
export interface AutoSuggestState {
  /** Current input value */
  input: string | undefined;
  /** Whether an item has been selected (single selection mode) */
  selected: boolean;
  /** Whether the suggestion menu should be focused/visible */
  focusMenu: boolean;
  /** ID of the currently active/focused descendant for ARIA */
  activeDescendantId: string | undefined;
  /** Array of selected items (multiple selection mode) */
  selectedItems: SelectedItem[];
}

/**
 * Action types for AutoSuggest state management
 */
export type AutoSuggestAction =
  | { type: 'SET_INPUT'; payload: string | undefined }
  | { type: 'SET_SELECTED'; payload: boolean }
  | { type: 'SET_FOCUS_MENU'; payload: boolean }
  | { type: 'SET_ACTIVE_DESCENDANT'; payload: string | undefined }
  | {
      type: 'SELECT_ITEM';
      payload: { itemId: string; itemName: string; itemValue: string };
    }
  | {
      type: 'ADD_SELECTED_ITEM';
      payload: { itemId: string; itemName: string; itemValue: string };
    }
  | {
      type: 'REMOVE_SELECTED_ITEM';
      payload: string; // itemId
    }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'CLEAR_SELECTED_ITEMS' }
  | { type: 'CLOSE_MENU_CLEAR_SELECTION' }
  | { type: 'RESET' };

/**
 * Reducer function for AutoSuggest state management
 */
function autoSuggestReducer(
  state: AutoSuggestState,
  action: AutoSuggestAction
): AutoSuggestState {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        input: action.payload,
        selected: false,
      };

    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload,
      };

    case 'SET_FOCUS_MENU':
      return {
        ...state,
        focusMenu: action.payload,
      };

    case 'SET_ACTIVE_DESCENDANT':
      return {
        ...state,
        activeDescendantId: action.payload,
      };

    case 'SELECT_ITEM':
      return {
        ...state,
        activeDescendantId: undefined,
        focusMenu: false,
        input: action.payload.itemName,
        selected: true,
      };

    case 'ADD_SELECTED_ITEM':
      return {
        ...state,
        activeDescendantId: undefined,
        focusMenu: false,
        input: '',
        selectedItems: [
          ...state.selectedItems,
          {
            id: action.payload.itemId,
            name: action.payload.itemName,
            value: action.payload.itemValue,
          },
        ],
      };

    case 'REMOVE_SELECTED_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          item => item.id !== action.payload
        ),
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selected: false,
      };

    case 'CLEAR_SELECTED_ITEMS':
      return {
        ...state,
        selectedItems: [],
      };

    case 'CLOSE_MENU_CLEAR_SELECTION':
      return {
        ...state,
        activeDescendantId: undefined,
        focusMenu: false,
        selected: false,
      };

    case 'RESET':
      return {
        activeDescendantId: undefined,
        focusMenu: false,
        input: '',
        selected: false,
        selectedItems: [],
      };

    default:
      return state;
  }
}

/**
 * Custom hook for managing AutoSuggest state
 *
 * @example
 * ```tsx
 * const autoSuggestState = useAutoSuggestState();
 *
 * // Access state
 * const { input, selected, focusMenu } = autoSuggestState.state;
 *
 * // Dispatch actions
 * autoSuggestState.setInput('new value');
 * autoSuggestState.selectItem('suggestion', 'value');
 * ```
 */
export function useAutoSuggestState() {
  const [state, dispatch] = useReducer(autoSuggestReducer, {
    activeDescendantId: undefined,
    focusMenu: false,
    input: '',
    selected: false,
    selectedItems: [],
  });

  // Convenience functions for common operations
  const setInput = useCallback((input: string | undefined) => {
    dispatch({ payload: input, type: 'SET_INPUT' });
  }, []);

  const setSelected = useCallback((selected: boolean) => {
    dispatch({ payload: selected, type: 'SET_SELECTED' });
  }, []);

  const setFocusMenu = useCallback((focusMenu: boolean) => {
    dispatch({ payload: focusMenu, type: 'SET_FOCUS_MENU' });
  }, []);

  const setActiveDescendantId = useCallback((id: string | undefined) => {
    dispatch({ payload: id, type: 'SET_ACTIVE_DESCENDANT' });
  }, []);

  const selectItem = useCallback(
    (itemId: string, itemName: string, itemValue: string) => {
      dispatch({
        payload: { itemId, itemName, itemValue },
        type: 'SELECT_ITEM',
      });
    },
    []
  );

  const addSelectedItem = useCallback(
    (itemId: string, itemName: string, itemValue: string) => {
      dispatch({
        payload: { itemId, itemName, itemValue },
        type: 'ADD_SELECTED_ITEM',
      });
    },
    []
  );

  const removeSelectedItem = useCallback((itemId: string) => {
    dispatch({
      payload: itemId,
      type: 'REMOVE_SELECTED_ITEM',
    });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  const clearSelectedItems = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTED_ITEMS' });
  }, []);

  const closeMenuClearSelection = useCallback(() => {
    dispatch({ type: 'CLOSE_MENU_CLEAR_SELECTION' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    addSelectedItem,
    clearSelectedItems,
    clearSelection,
    closeMenuClearSelection,
    removeSelectedItem,
    reset,
    selectItem,
    setActiveDescendantId,
    setFocusMenu,
    setInput,
    setSelected,
    state,
  };
}
