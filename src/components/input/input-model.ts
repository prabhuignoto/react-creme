import React from "react";

export interface InputModel {
  children?: React.ReactNode;
  enableClear?: boolean;
  onChange?: (val: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  placeholder?: string;
  state?: "default" | "error" | "success";
  type?: "text" | "password";
  value?: string;
}
