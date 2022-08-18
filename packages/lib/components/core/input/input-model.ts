import React, { CSSProperties } from 'react';

export interface InputProps {
  /**
   * 🔴 Right to Left
   */
  RTL?: boolean;

  /**
   * 🔴 Style accent of the Input
   */
  accent?: 'rounded' | 'flat';

  alignCenter?: boolean;

  /**
   * 🔴 Enables or Disables the border
   */
  border?: boolean;

  /**
   * 🔴 Children to be rendered in the Input
   */
  children?: React.ReactNode;

  /**
   * 🔴 Controlled or Not
   */
  controlled?: boolean;

  /**
   * 🔴 Disables the Input
   */
  disabled?: boolean;

  /**
   * 🔴 Enables the clear button
   */
  enableClear?: boolean;

  /**
   * 🔴 Makes the input Focusable
   */
  focusable?: boolean;

  /**
   * 🔴 Unique id of the Input
   */
  id?: string;

  /**
   * 🔴 Marks the input as AutoComplete
   */
  isAutoComplete?: boolean;

  /**
   * 🔴 maximum value when the type is number
   */
  max?: number;

  /**
   * 🔴 maximum length of the Input
   */
  maxLength?: number;

  /**
   * 🔴 minimum value when the type is number
   */
  min?: number;

  /**
   * 🔴 When enabled, the id needs to be manually passed
   */
  noUniqueId?: boolean;

  /**
   * 🔴 callback executed when the input value changes
   */
  onChange?: (val: string) => void;

  onFocus?: (ev: React.FocusEvent) => void;

  onKeyDown?: (ev: React.KeyboardEvent) => void;

  /**
   * 🔴 callback executed on every keystroke
   */
  onKeyUp?: (ev: React.KeyboardEvent) => void;

  /**
   * 🔴 placeholder text
   */
  placeholder?: string;

  /**
   * 🔴 show the spinner
   */
  showSpinner?: boolean;

  size?: 'sm' | 'md' | 'lg';

  /**
   * 🔴 state of the input
   */
  state?: 'default' | 'error' | 'success';

  /**
   * 🔴 Custom style
   */
  style?: CSSProperties;

  transparentBg?: boolean;

  /**
   * 🔴 type of Input
   */
  type?: 'text' | 'password' | 'number';

  /**
   * 🔴 value of the Input
   */
  value?: string;
}
