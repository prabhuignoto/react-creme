import React from 'react';

export interface AutoSuggestProps {
  accent?: 'rounded' | 'flat';
  apiBacked?: boolean;
  debounce?: number;
  disableIcon?: boolean;
  focusable?: boolean;
  icon?: React.ReactNode;
  onChange?: (value?: string) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  onSelection?: (selected: AutoSuggestOption) => void;
  placeholder?: string;
  rtl?: boolean;
  showSpinner?: boolean;
  size?: 'sm' | 'md' | 'lg';
  suggestions: AutoSuggestOption[];
  suggestionsWidth?: number;
  value?: string;
}

export type AutoSuggestOption = {
  name: string;
  value: string;
};
