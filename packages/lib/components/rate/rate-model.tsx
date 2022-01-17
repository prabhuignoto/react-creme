import { ReactNode } from 'react';

interface CommonProps {
  focusable?: boolean;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export interface RateProps extends CommonProps {
  disabled?: boolean;
  iconCount?: number;
  onChange?: (value: number | string) => void;
  ratingValues?: string[];
  value?: 1 | 2 | 3 | 4 | 5;
}

export interface RateItemProps {
  active: boolean;
  hovered: boolean;
  id: string;
}

export interface RateItemViewProps extends CommonProps, RateItemProps {
  disabled?: boolean;
  index: number;
  onMouseOver: (idx: number) => void;
  onSelect: (idx: number) => void;
}
