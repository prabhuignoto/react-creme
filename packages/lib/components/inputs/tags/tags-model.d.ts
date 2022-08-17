import { CSSProperties } from 'react';
export interface TagsProps {
  RTL?: boolean;
  accent?: 'rounded' | 'flat';
  autoComplete?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: TagItemProps[];
  maxTags?: number;
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  suggestions?: string[];
  tagStyle?: 'default' | 'fill';
  tagWidth?: number;
  wrap?: boolean;
}
export declare type TagItemProps = Pick<
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
