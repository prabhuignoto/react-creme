import { RefObject, useCallback, useEffect, useRef } from 'react';

interface UseMenuBarKeyboardProps {
  ref: RefObject<HTMLUListElement | null>;
  itemCount: number;
  onOpenMenu: (itemId: string | undefined) => void;
  getItemId: (index: number) => string | undefined;
  RTL?: boolean;
  enabled?: boolean;
}

/**
 * Hook for keyboard navigation in MenuBar component
 * Handles Arrow Left/Right, Home/End, Enter/Space for opening menus, and Escape for closing
 */
export function useMenuBarKeyboard({
  ref,
  itemCount,
  onOpenMenu,
  getItemId,
  RTL = false,
  enabled = true,
}: UseMenuBarKeyboardProps) {
  const focusedIndexRef = useRef<number>(-1);

  const focusItem = useCallback(
    (index: number) => {
      if (!ref.current || index < 0 || index >= itemCount) return;

      const items = ref.current.querySelectorAll('li');
      if (items[index] instanceof HTMLElement) {
        items[index].focus();
        focusedIndexRef.current = index;
      }
    },
    [ref, itemCount]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || !ref.current) return;

      const items = ref.current.querySelectorAll('li');
      const currentIndex = Array.from(items).findIndex(
        item => document.activeElement === item
      );

      const isLeftArrow = e.key === 'ArrowLeft';
      const isRightArrow = e.key === 'ArrowRight';
      const isHome = e.key === 'Home';
      const isEnd = e.key === 'End';
      const isEnter = e.key === 'Enter';
      const isSpace = e.key === ' ';
      const isEscape = e.key === 'Escape';

      // Arrow navigation
      if (isLeftArrow || isRightArrow) {
        e.preventDefault();

        let nextIndex = currentIndex;
        if (RTL) {
          nextIndex = isLeftArrow ? currentIndex + 1 : currentIndex - 1;
        } else {
          nextIndex = isRightArrow ? currentIndex + 1 : currentIndex - 1;
        }

        // Wrap around
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;

        focusItem(nextIndex);
        return;
      }

      // Home/End keys
      if (isHome) {
        e.preventDefault();
        focusItem(0);
        return;
      }

      if (isEnd) {
        e.preventDefault();
        focusItem(itemCount - 1);
        return;
      }

      // Enter/Space to open menu
      if (isEnter || isSpace) {
        if (currentIndex >= 0) {
          e.preventDefault();
          const itemId = getItemId(currentIndex);
          onOpenMenu(itemId);
          return;
        }
      }

      // Escape to close menu (handled by parent component)
      if (isEscape) {
        // Let parent handle this
        return;
      }
    },
    [enabled, ref, itemCount, focusItem, RTL, getItemId, onOpenMenu]
  );

  // Set up event listener
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const wrapper = ref.current;
    wrapper.addEventListener('keydown', handleKeyDown);

    return () => {
      wrapper.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, ref, handleKeyDown]);

  // Set tabindex on items
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const items = ref.current.querySelectorAll('li');
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  }, [enabled, ref, itemCount]);

  return {
    focusItem,
  };
}
