export interface ProgressModel {
  currentValue?: number;
  infiniteStyle?: "disappear" | "bob";
  maxValue?: number;
  showProgressValue?: boolean;
  size?: "lg" | "md" | "sm";
  type: "infinite" | "progressive";
  width?: number;
  status?: "success" | "error" | "default";
  RTL?: boolean;
}
