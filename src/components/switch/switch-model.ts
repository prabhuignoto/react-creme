export interface SwitchModel {
  onChange?: (val: boolean) => void;
  label?: string;
  width?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}
