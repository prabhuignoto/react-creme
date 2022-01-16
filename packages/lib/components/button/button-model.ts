import React, { CSSProperties } from "react";

export interface ButtonModel {
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  primary?: boolean;
  type?: "primary" | "default" | "danger" | "icon" | "progress";
  size?: "sm" | "md" | "lg";
  focusable?: boolean;
  style?: CSSProperties;
  border?: boolean;
}
