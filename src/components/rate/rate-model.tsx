import { ReactNode } from "react";

export interface RateProps {
  onChange?: (value: number) => void;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  value?: 1 | 2 | 3 | 4 | 5;
  iconCount?: number;
}

export interface RateItemModel {
  id: string;
  active: boolean;
  hovered: boolean;
}
