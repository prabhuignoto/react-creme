import { CSSProperties } from 'react';

export interface TagItemProps {
  disabled?: boolean;
  name: string;
  readonly?: boolean;
}

export interface TagItemInternalProps extends TagItemProps {
  id?: string;
  markedForRemoval?: boolean;
}
export interface TagsProps {
  RTL?: boolean;
  autoComplete?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: TagItemProps[];
  maxTags?: number;
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  readonly?: boolean;
  style?: CSSProperties;
  suggestions?: string[];
  tagSize?: 'small' | 'large';
  tagStyle?: 'default' | 'fill';
  tagWidth?: number;
}
