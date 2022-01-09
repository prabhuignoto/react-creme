import { CSSProperties } from "react";

export interface RadioModel {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean | null;
  isControlled?: boolean;
  label?: string;
  onChange?: (state: {
    id?: string;
    selected?: boolean;
    value?: string;
  }) => void;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  value?: string;
  focusable?: boolean;
  withGroup?: boolean;
  fullWidth?: boolean;
}
