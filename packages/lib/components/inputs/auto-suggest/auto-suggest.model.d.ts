import { KeyboardEvent, ReactNode } from 'react';
export interface AutoSuggestProps {
  accent?: 'rounded' | 'flat';
  apiBacked?: boolean;
  debounce?: number;
  disableIcon?: boolean;
  focusable?: boolean;
  icon?: ReactNode;
  onChange?: (value?: string) => void;
  onKeyDown?: (ev: KeyboardEvent) => void;
  onKeyUp?: (ev: KeyboardEvent) => void;
  onSelection?: (selected: AutoSuggestOption) => void;
  placeholder?: string;
  rtl?: boolean;
  showSpinner?: boolean;
  size?: 'sm' | 'md' | 'lg';
  suggestions: AutoSuggestOption[];
  suggestionsWidth?: number;
  value?: string;
}
export declare type AutoSuggestOption = {
  name: string;
  value: string;
};
