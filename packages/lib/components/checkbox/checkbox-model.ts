import { CSSProperties } from "react";

export interface CheckboxModel {
  autoHeight?: boolean;
  border?: boolean;
  id?: string;
  checkBoxStyle?: "square" | "round";
  disabled?: boolean;
  focusIcon?: boolean;
  focusable?: boolean;
  height?: number;
  isChecked?: boolean;
  label: string;
  noHoverStyle?: boolean;
  noUniqueId?: boolean;
  onChange?: (id: string, name: string, selected: boolean) => void;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  RTL?: boolean;
}
