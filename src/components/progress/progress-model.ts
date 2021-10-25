export interface ProgressModel {
  currentValue?: number;
  infiniteStyle?: "disappear" | "bob";
  maxValue?: number;
  showProgressValue?: boolean;
  size?: "big" | "small";
  type: "infinite" | "progressive";
  width?: number;
}
