import { CSSProperties } from "react";

export interface SwitchModel {
  disabled?: boolean;
  label?: string;
  onChange?: (val: boolean) => void;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  width?: number;
  labelOutside?: boolean;
  checked?: boolean;
  focusable?: boolean;
}
