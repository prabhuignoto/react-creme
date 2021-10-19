export interface ProgressModel {
  currentValue?: number;
  maxValue?: number;
  showProgressValue?: boolean;
  type: "infinite" | "progressive";
  width?: number;
  size?: "big" | "small";
}
