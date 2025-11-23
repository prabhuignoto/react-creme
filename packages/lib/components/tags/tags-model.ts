import { CSSProperties } from 'react';

// export interface TagItemInternalProps extends TagItemProps {
//   id?: string;
//   markedForRemoval?: boolean;
// }

/**
 * Props for the Tags component - a customizable tag input with autocomplete support
 */
export interface TagsProps {
  /** Enable right-to-left text direction */
  RTL?: boolean;

  /** Visual accent style for tags */
  accent?: 'rounded' | 'flat';

  /** @deprecated This prop is unused and will be removed in future versions */
  autoComplete?: boolean;

  /** Disable the entire tags component */
  disabled?: boolean;

  /** Whether to allow duplicate tag values (default: false) */
  allowDuplicates?: boolean;

  /** Enable keyboard focus on the component */
  focusable?: boolean;

  /** Array of initial tag items */
  items: TagItemProps[];

  /** Maximum number of tags allowed (default: unlimited) */
  maxTags?: number;

  /** Callback fired when tags change */
  onChange?: (selected: string[]) => void;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Prevent adding/removing tags while keeping them visible */
  readonly?: boolean;

  /** Size variant for tags */
  size?: 'sm' | 'md' | 'lg';

  /** Custom inline styles */
  style?: CSSProperties;

  /** Array of suggested values for autocomplete */
  suggestions?: string[];

  /** Custom height for tags in pixels */
  tagHeight?: number;

  /** Visual style for tags */
  tagStyle?: 'default' | 'fill';

  /** Width for tags in pixels (default: 60) */
  tagWidth?: number;

  /** Allow tags to wrap to multiple lines (default: true) */
  wrap?: boolean;
}

export type TagItemProps = Pick<
  TagsProps,
  | 'disabled'
  | 'readonly'
  | 'accent'
  | 'focusable'
  | 'tagStyle'
  | 'size'
  | 'tagWidth'
> & {
  id?: string;
  markedForRemoval?: boolean;
  name: string;
};
