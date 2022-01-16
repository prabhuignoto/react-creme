import { CSSProperties } from "react";

export interface RadioGroupModel {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: RadioGroupItemModel[];
  layout?: "row" | "column";
  onSelected?: (selected: string) => void;
  style?: CSSProperties;
}

export interface RadioGroupItemModel {
  checked?: boolean | null;
  disabled?: boolean;
  id?: string;
  label: string;
  value?: string;
}
