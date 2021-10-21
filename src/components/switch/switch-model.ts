export interface SwitchModel {
  onChange?: (val: boolean) => void;
  label?: string;
  width?: number;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}
