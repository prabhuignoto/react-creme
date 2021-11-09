import { CSSProperties } from "react";

export interface CheckboxModel {
  label: string;
  onChange?: (selected: boolean) => void;
  isChecked?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  height?: number;
  border?: boolean;
}
