import { CSSProperties } from "react";

export interface RadioModel {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean | null;
  isControlled?: boolean;
  label?: string;
  onChange?: (state: { id?: string; selected?: boolean }) => void;
  value?: string;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}
