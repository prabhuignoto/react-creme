import { ListOption } from '../list/list-model';

/**
 * Props for the Transfer component
 */
export interface TransferProps {
  /** Items to display in the left (source) list */
  list1: string[];
  /** Items to display in the right (target) list */
  list2: string[];
  /** Callback when lists change: (list1: string[], list2: string[]) => void */
  onChange?: (list1: string[], list2: string[]) => void;
  /** Enable search/filter functionality in both lists */
  enableSearch?: boolean;
  /** Enable virtualization for large lists (100+ items) */
  virtualize?: boolean;
  /** Make lists focusable without explicit tab (useful for nested focus contexts) */
  focusable?: boolean;
  /** Size variant for buttons and list items */
  size?: 'sm' | 'md' | 'lg';
  /** Enable right-to-left layout for RTL languages */
  RTL?: boolean;
  /** Show "transfer all" buttons in addition to "transfer selection" buttons */
  showTransferAll?: boolean;
}

/**
 * Internal model for Transfer list items.
 * All properties are required (no optional fields) to prevent undefined errors.
 */
export interface TransferListInternalModel {
  /** Unique identifier for the item (generated with nanoid) */
  id: string;
  /** Display name/label of the item */
  name: string;
  /** Whether the item is currently selected */
  selected: boolean;
  /** Whether the item is visible (not filtered out) */
  visible: boolean;
}

export type TransferList = 'list1' | 'list2';

/**
 * Props for the TransferList sub-component
 */
export type TransferListProps = Pick<
  TransferProps,
  'focusable' | 'virtualize' | 'size' | 'RTL'
> & {
  /** Enable search/filter functionality */
  enableSearch?: boolean;
  /** Identifier for this list ('list1' or 'list2') */
  listId: TransferList;
  /** Callback when selection changes */
  onSelection: (selected: ListOption[]) => void;
  /** List items to display */
  options: ListOption[];
};
