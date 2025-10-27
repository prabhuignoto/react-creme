import { RefObject } from 'react';
import useFocusNew from './useFocusNew';
import { useKeyNavigation, UseKeyNavigationOptions } from './useKeyNavigation';

/**
 * Combined focus visibility + keyboard navigation hook
 * Composites useFocusNew (visual ring) and useKeyNavigation (keyboard handlers)
 * for list-like interactive components
 *
 * @param ref - Reference to the container element
 * @param startIndex - Initial selection index
 * @param collectionLength - Number of items in the collection
 * @param options - Configuration combining both focus and keyboard options
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * const { selection, setSelection } = useFocusState(ref, 0, items.length, {
 *   enableVisualRing: true,
 *   orientation: 'horizontal',
 *   rtl: false,
 *   onNavigate: (index) => setSelectedIndex(index),
 *   onEnter: () => handleSelect(),
 * });
 * ```
 */
export interface UseFocusStateOptions extends UseKeyNavigationOptions {
  /**
   * Enable visual focus ring animation (via useFocusNew)
   * @default true
   */
  enableVisualRing?: boolean;
}

export function useFocusState(
  ref: RefObject<HTMLElement>,
  startIndex: number,
  collectionLength: number,
  options: UseFocusStateOptions = {}
) {
  const { enableVisualRing = true, ...keyboardOptions } = options;

  // Apply visual focus ring if enabled
  if (enableVisualRing && ref?.current) {
    useFocusNew(ref);
  }

  // Apply keyboard navigation
  const result = useKeyNavigation(ref, startIndex, collectionLength, keyboardOptions);

  return result;
}

export default useFocusState;
