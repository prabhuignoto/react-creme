import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAutoSuggestState } from '../useAutoSuggestState';

describe('useAutoSuggestState', () => {
  describe('initial state', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      expect(result.current.state).toEqual({
        input: '',
        selected: false,
        focusMenu: false,
        activeDescendantId: undefined,
        selectedItems: [],
      });
    });
  });

  describe('setInput', () => {
    it('should set input value and clear selected', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setInput('test');
      });

      expect(result.current.state.input).toBe('test');
      expect(result.current.state.selected).toBe(false);
    });

    it('should handle undefined input', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setInput(undefined);
      });

      expect(result.current.state.input).toBeUndefined();
    });
  });

  describe('setSelected', () => {
    it('should set selected state', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setSelected(true);
      });

      expect(result.current.state.selected).toBe(true);
    });
  });

  describe('setFocusMenu', () => {
    it('should set focus menu state', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setFocusMenu(true);
      });

      expect(result.current.state.focusMenu).toBe(true);
    });
  });

  describe('setActiveDescendantId', () => {
    it('should set active descendant ID', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setActiveDescendantId('item-1');
      });

      expect(result.current.state.activeDescendantId).toBe('item-1');
    });
  });

  describe('selectItem', () => {
    it('should set input, selected, and close menu', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setFocusMenu(true);
        result.current.selectItem('item-1', 'Selected Item', 'selected-value');
      });

      expect(result.current.state.input).toBe('Selected Item');
      expect(result.current.state.selected).toBe(true);
      expect(result.current.state.focusMenu).toBe(false);
      expect(result.current.state.activeDescendantId).toBeUndefined();
    });
  });

  describe('addSelectedItem', () => {
    it('should add item to selected items and clear input', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setInput('test');
        result.current.addSelectedItem('item-1', 'Item One', 'item-1-value');
      });

      expect(result.current.state.selectedItems).toHaveLength(1);
      expect(result.current.state.selectedItems[0]).toEqual({
        id: 'item-1',
        name: 'Item One',
        value: 'item-1-value',
      });
      expect(result.current.state.input).toBe('');
      expect(result.current.state.focusMenu).toBe(false);
    });

    it('should add multiple items', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.addSelectedItem('item-1', 'Item One', 'item-1-value');
        result.current.addSelectedItem('item-2', 'Item Two', 'item-2-value');
      });

      expect(result.current.state.selectedItems).toHaveLength(2);
      expect(result.current.state.selectedItems[0].id).toBe('item-1');
      expect(result.current.state.selectedItems[1].id).toBe('item-2');
    });
  });

  describe('removeSelectedItem', () => {
    it('should remove item from selected items', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.addSelectedItem('item-1', 'Item One', 'item-1-value');
        result.current.addSelectedItem('item-2', 'Item Two', 'item-2-value');
      });

      expect(result.current.state.selectedItems).toHaveLength(2);

      act(() => {
        result.current.removeSelectedItem('item-1');
      });

      expect(result.current.state.selectedItems).toHaveLength(1);
      expect(result.current.state.selectedItems[0].id).toBe('item-2');
    });
  });

  describe('clearSelectedItems', () => {
    it('should clear all selected items', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.addSelectedItem('item-1', 'Item One', 'item-1-value');
        result.current.addSelectedItem('item-2', 'Item Two', 'item-2-value');
      });

      expect(result.current.state.selectedItems).toHaveLength(2);

      act(() => {
        result.current.clearSelectedItems();
      });

      expect(result.current.state.selectedItems).toHaveLength(0);
    });
  });

  describe('clearSelection', () => {
    it('should clear selected state', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setSelected(true);
        result.current.clearSelection();
      });

      expect(result.current.state.selected).toBe(false);
    });
  });

  describe('closeMenuClearSelection', () => {
    it('should close menu and clear selection', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setFocusMenu(true);
        result.current.setSelected(true);
        result.current.setActiveDescendantId('item-1');
        result.current.closeMenuClearSelection();
      });

      expect(result.current.state.focusMenu).toBe(false);
      expect(result.current.state.selected).toBe(false);
      expect(result.current.state.activeDescendantId).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.setInput('test');
        result.current.setSelected(true);
        result.current.setFocusMenu(true);
        result.current.setActiveDescendantId('item-1');
      });

      expect(result.current.state.input).toBe('test');
      expect(result.current.state.selected).toBe(true);
      expect(result.current.state.focusMenu).toBe(true);
      expect(result.current.state.activeDescendantId).toBe('item-1');

      act(() => {
        result.current.reset();
      });

      expect(result.current.state).toEqual({
        input: '',
        selected: false,
        focusMenu: false,
        activeDescendantId: undefined,
        selectedItems: [],
      });
    });

    it('should reset multiple selected items', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      act(() => {
        result.current.addSelectedItem('item-1', 'Item One', 'item-1-value');
        result.current.addSelectedItem('item-2', 'Item Two', 'item-2-value');
      });

      expect(result.current.state.selectedItems).toHaveLength(2);

      act(() => {
        result.current.reset();
      });

      expect(result.current.state.selectedItems).toHaveLength(0);
      expect(result.current.state.input).toBe('');
    });
  });

  describe('state transitions', () => {
    it('should handle complete user flow', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      // User types
      act(() => {
        result.current.setInput('item');
      });
      expect(result.current.state.input).toBe('item');
      expect(result.current.state.selected).toBe(false);

      // Menu opens
      act(() => {
        result.current.setFocusMenu(true);
      });
      expect(result.current.state.focusMenu).toBe(true);

      // Active descendant is set during keyboard navigation
      act(() => {
        result.current.setActiveDescendantId('suggestion-1');
      });
      expect(result.current.state.activeDescendantId).toBe('suggestion-1');

      // User selects an item
      act(() => {
        result.current.selectItem('item-id', 'Item Name', 'item-value');
      });
      expect(result.current.state.input).toBe('Item Name');
      expect(result.current.state.selected).toBe(true);
      expect(result.current.state.focusMenu).toBe(false);
      expect(result.current.state.activeDescendantId).toBeUndefined();
    });

    it('should handle escape key flow', () => {
      const { result } = renderHook(() => useAutoSuggestState());

      // Setup: menu open with selection
      act(() => {
        result.current.setInput('test');
        result.current.setFocusMenu(true);
        result.current.setActiveDescendantId('item-1');
        result.current.setSelected(true);
      });

      // User presses Escape
      act(() => {
        result.current.closeMenuClearSelection();
      });

      expect(result.current.state.focusMenu).toBe(false);
      expect(result.current.state.selected).toBe(false);
      expect(result.current.state.activeDescendantId).toBeUndefined();
      // Input should persist
      expect(result.current.state.input).toBe('test');
    });
  });
});
