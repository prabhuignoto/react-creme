import React, { CSSProperties } from "react";

export interface InputModel {
  border?: boolean;
  children?: React.ReactNode;
  controlled?: boolean;
  disabled?: boolean;
  enableClear?: boolean;
  focusable?: boolean;
  id?: string;
  isAutoComplete?: boolean;
  noUniqueId?: boolean;
  onChange?: (val: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  placeholder?: string;
  state?: "default" | "error" | "success";
  style?: CSSProperties;
  type?: "text" | "password";
  value?: string;
  RTL?: boolean;
}
