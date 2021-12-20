import React from "react";

export interface AutoCompleteProps {
  onChange?: (value: string) => void;
  suggestions: string[];
  suggestionsWidth?: number;
  placeholder?: string;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  value?: string;
}
