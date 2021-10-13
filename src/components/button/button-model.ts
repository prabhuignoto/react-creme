import React from "react";

export interface ButtonModel {
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  borderLess?: boolean;
  primary?: boolean;
  type?: "primary" | "default" | "danger" | "icon";
}
