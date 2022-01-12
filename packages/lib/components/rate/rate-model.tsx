import { ReactNode } from "react";

interface CommonProps {
  focusable?: boolean;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export interface RateProps extends CommonProps {
  iconCount?: number;
  onChange?: (value: number | string) => void;
  ratingValues?: string[];
  value?: 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
}

export interface RateItemModel {
  active: boolean;
  hovered: boolean;
  id: string;
}

export interface RateItemViewModel extends CommonProps, RateItemModel {
  index: number;
  onMouseOver: (idx: number) => void;
  onSelect: (idx: number) => void;
  disabled?: boolean;
}
