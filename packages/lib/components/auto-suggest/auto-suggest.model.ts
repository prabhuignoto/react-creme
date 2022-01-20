import React from 'react';

export interface AutoCompleteProps {
  accent?: 'rounded' | 'flat';
  apiBacked?: boolean;
  debounce?: number;
  focusable?: boolean;
  icon?: React.ReactNode;
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
