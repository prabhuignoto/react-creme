import React from "react";

export interface AutoCompleteProps {
  focusable?: boolean;
  onChange?: (value: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  onSelection?: (value: string) => void;
  placeholder?: string;
  suggestions: string[];
  suggestionsWidth?: number;
  value?: string;
}
