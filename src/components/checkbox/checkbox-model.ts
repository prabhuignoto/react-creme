import { CSSProperties } from "react";

export interface CheckboxModel {
  autoHeight?: boolean;
  border?: boolean;
  disabled?: boolean;
  height?: number;
  isChecked?: boolean;
  label: string;
  noHoverStyle?: boolean;
  onChange?: (id: string, name: string, selected: boolean) => void;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  focusable?: boolean;
  focusIcon?: boolean;
  noUniqueId?: boolean;
  id?: string;
}
