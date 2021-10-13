import React from "react";

export interface InputModel {
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (val: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  children?: React.ReactNode;
  enableClear?: boolean;
}
