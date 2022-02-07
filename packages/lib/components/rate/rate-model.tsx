import { ReactNode } from 'react';

export interface RateProps {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  icon?: ReactNode;
  iconCount?: number;
  onChange?: (value: number | string) => void;
  ratingValues?: string[];
  size?: 'sm' | 'md' | 'lg';
  value?: 1 | 2 | 3 | 4 | 5;
}

export interface RateItemProps {
  active: boolean;
  hovered: boolean;
  id: string;
}

export type RateItemViewProps = Pick<
  RateProps,
  'disabled' | 'focusable' | 'icon' | 'size'
> &
  RateItemProps & {
    index: number;
    onMouseOver: (idx: number) => void;
    onSelect: (idx: number) => void;
  };
