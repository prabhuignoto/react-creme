import React from 'react';

export interface AutoCompleteProps {
  accent?: 'rounded' | 'flat';
  debounce?: number;
  focusable?: boolean;
  noFiltering?: boolean;
  onChange?: (value: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  onSelection?: (selected: AutoCompleteOption) => void;
  placeholder?: string;
  showSpinner?: boolean;
  suggestions: AutoCompleteOption[];
  suggestionsWidth?: number;
  value?: string;
}

export type AutoCompleteOption = { name: string; value: string };
