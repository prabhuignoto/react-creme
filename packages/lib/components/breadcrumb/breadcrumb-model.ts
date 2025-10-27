/**
 * Props for the BreadCrumb component
 *
 * @interface BreadCrumbProps
 */
export type BreadCrumbProps = {
  /**
   * Enable right-to-left layout mode for RTL languages (Arabic, Hebrew, etc.)
   * Automatically reverses breadcrumb order and flips separator icons
   * @default false
   */
  RTL?: boolean;

  /**
   * Enable keyboard navigation with arrow keys (Left/Right), Home, and End keys
   * Set to false to disable keyboard interaction
   * @default true
   */
  focusable?: boolean;

  /**
   * Separator icon style displayed between breadcrumb items
   * - 'chevron': › (default, subtle directional indicator)
   * - 'arrow': → (strong directional emphasis)
   * - 'slash': — (minimal, space-efficient)
   * @default 'chevron'
   */
  icon?: 'chevron' | 'arrow' | 'slash';

  /**
   * **Required.** Array of breadcrumb labels representing the navigation hierarchy
   * Each string represents a level in the path from root to current page
   * @example ['Home', 'Products', 'Electronics', 'Smartphones']
   */
  links: string[];

  /**
   * Callback invoked when user clicks or navigates to a breadcrumb item
   * Receives the selected breadcrumb label as the parameter
   * @param selected - The label of the selected breadcrumb item
   * @example (selected) => navigate(`/${selected.toLowerCase()}`)
   */
  onSelected?: (selected?: string) => void;

  /**
   * Zero-based index of the initially selected breadcrumb item
   * Use this to highlight a specific position in the navigation trail
   * @default 0
   * @example 2 // Highlights the third breadcrumb item
   */
  selectedCrumbIndex?: number;

  /**
   * Visual size of breadcrumb text and icons
   * - 'sm': Small (default, compact for dense layouts)
   * - 'md': Medium (balanced visibility)
   * - 'lg': Large (improved touch targets for mobile)
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Internal props for individual breadcrumb items
 * Extends selected props from BreadCrumbProps with item-specific properties
 *
 * @interface BreadCrumbItemProps
 * @internal
 */
export type BreadCrumbItemProps = Pick<
  BreadCrumbProps,
  'icon' | 'size' | 'focusable' | 'RTL'
> & {
  /** Unique identifier for the breadcrumb item */
  id: string;

  /** Zero-based position of this item in the breadcrumb trail */
  index: number;

  /** Indicates if this is the last item (current page) */
  isLast: boolean;

  /** Display label for this breadcrumb item */
  name: string;

  /**
   * Internal callback for handling item selection
   * @param index - Position of the selected item
   * @param name - Label of the selected item
   */
  onSelected?: (index: number, name: string) => void;

  /** Whether this item is currently selected */
  selected?: boolean;

  /** Whether to display separator icon after this item */
  showChevron?: boolean;
};
