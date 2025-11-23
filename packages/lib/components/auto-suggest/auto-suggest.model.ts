import { KeyboardEvent, ReactNode } from 'react';

/**
 * Props for the AutoSuggest component
 */
export interface AutoSuggestProps {
  /** Visual style variant for the input */
  accent?: 'rounded' | 'flat';

  /**
   * When true, suggestions are managed externally (e.g., from an API).
   * In this mode, all suggestions from the `suggestions` prop are displayed
   * without client-side filtering. When false, suggestions are filtered
   * client-side based on user input.
   * @default false
   */
  apiBacked?: boolean;

  /**
   * Debounce delay in milliseconds before calling onChange.
   * Useful for reducing API calls when apiBacked is true.
   * @default 100
   */
  debounce?: number;

  /** When true, hides the search icon */
  disableIcon?: boolean;

  /** When false, input cannot receive keyboard focus */
  focusable?: boolean;

  /** Custom icon to display (replaces default search icon) */
  icon?: ReactNode;

  /**
   * Callback fired when input value changes (debounced).
   * @param value - Current input value
   */
  onChange?: (value?: string) => void;

  /** Callback fired on keydown events */
  onKeyDown?: (ev: KeyboardEvent) => void;

  /** Callback fired on keyup events */
  onKeyUp?: (ev: KeyboardEvent) => void;

  /**
   * Callback fired when user selects a suggestion from the list.
   * @param selected - The selected suggestion option
   */
  onSelection?: (selected: AutoSuggestOption) => void;

  /** Placeholder text for the input */
  placeholder?: string;

  /** Enable right-to-left text direction */
  rtl?: boolean;

  /** Show loading spinner in the input */
  showSpinner?: boolean;

  /** Size variant for the input */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Array of suggestion options to display.
   * When apiBacked is false, these are filtered client-side.
   * When apiBacked is true, all suggestions are shown as-is.
   */
  suggestions: AutoSuggestOption[];

  /**
   * Width of the suggestions dropdown in pixels.
   * @default 250
   */
  suggestionsWidth?: number;

  /** Controlled value for the input */
  value?: string;

  /** ARIA label for screen readers */
  'aria-label'?: string;

  /** ARIA labelledby for connecting to external label element */
  'aria-labelledby'?: string;

  /** ARIA describedby for connecting to description element */
  'aria-describedby'?: string;

  /**
   * Enable multiple item selection mode.
   * When enabled, users can select multiple suggestions.
   * @default false
   */
  multiple?: boolean;

  /**
   * Maximum number of items that can be selected.
   * Only applicable when multiple is true.
   * No limit if not specified.
   * @default undefined
   */
  maxSelections?: number;

  /**
   * Callback fired when selected items change in multiple selection mode.
   * @param selected - Array of selected suggestion options
   */
  onSelectionChange?: (selected: AutoSuggestOption[]) => void;

  /**
   * Enable grouped suggestions mode.
   * When enabled, suggestions are organized into groups.
   * @default false
   */
  grouped?: boolean;

  /**
   * Array of suggestion groups.
   * Only applicable when grouped is true.
   * Used instead of suggestions prop when grouping is enabled.
   */
  groups?: AutoSuggestGroup[];

  /**
   * Enable virtualization for large lists.
   * When enabled, only visible items are rendered for better performance.
   * @default false (but auto-enabled when itemCount > virtualizationThreshold)
   */
  virtualized?: boolean;

  /**
   * Threshold for automatically enabling virtualization.
   * Virtualization is auto-enabled when total items exceed this number.
   * @default 50
   */
  virtualizationThreshold?: number;

  /**
   * Height of each suggestion item in pixels (for virtualization).
   * @default 35
   */
  itemHeight?: number;

  /**
   * Number of items to render outside the visible viewport (for smooth scrolling).
   * Only used when virtualized is true.
   * @default 3
   */
  overscan?: number;
}

export type AutoSuggestOption = {
  name: string;
  value: string;
};

/**
 * Represents a group of suggestions
 */
export type AutoSuggestGroup = {
  /** Group label/title */
  label: string;
  /** Array of suggestions in this group */
  items: AutoSuggestOption[];
};
