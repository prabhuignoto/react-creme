import React, { CSSProperties, KeyboardEvent, MouseEvent } from 'react';

/**
 * Props for the Button component.
 *
 * The Button component is a customizable, accessible button element that supports
 * multiple visual styles, sizes, and states. It's built on the semantic HTML `<button>`
 * element for full keyboard and screen reader accessibility.
 *
 * @example
 * // Basic button with label
 * <Button label="Click me" onClick={handleClick} />
 *
 * @example
 * // Primary button with children
 * <Button type="primary" size="lg" onClick={handleSubmit}>
 *   <Icon name="plus" /> Add Item
 * </Button>
 *
 * @example
 * // Icon button (compact)
 * <Button type="icon" size="md" aria-label="Settings">
 *   <SettingsIcon />
 * </Button>
 */
export interface ButtonProps {
  /**
   * Visual accent style for the button borders.
   * @default 'rounded'
   */
  accent?: 'flat' | 'rounded';

  /**
   * Whether the button displays a visible border.
   * @default true
   */
  border?: boolean;

  /**
   * Content inside the button (can be icons, text, or other React elements).
   * If provided with `label`, both will be displayed.
   */
  children?: React.ReactNode;

  /**
   * Disables the button, preventing clicks and showing disabled styling.
   * Disabled buttons remain focusable but cannot be activated.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button can receive keyboard focus via Tab and arrow keys.
   * @default true
   */
  focusable?: boolean;

  /**
   * Whether the button is in a loading/busy state.
   * Shows a loading spinner and prevents interactions.
   * @default false
   */
  isBusy?: boolean;

  /**
   * Text label displayed in the button.
   * Used for accessibility if no aria-label is provided.
   * @default ''
   */
  label?: string;

  /**
   * Callback function triggered when button is clicked or activated via keyboard.
   * Not called if button is disabled or busy.
   */
  onClick?: (ev?: MouseEvent | KeyboardEvent) => void;

  /**
   * @deprecated Use `type="primary"` instead.
   * Sets the button to primary style.
   */
  primary?: boolean;

  /**
   * Size of the button affecting padding and text size.
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Inline CSS styles applied to the button element.
   */
  style?: CSSProperties;

  /**
   * Visual style type of the button.
   * - `primary`: Primary action style
   * - `default`: Default style
   * - `danger`: Danger/destructive action style
   * - `icon`: Icon-only button (no text label)
   * - `progress`: Button showing loading spinner
   * @default 'default'
   */
  type?: 'primary' | 'default' | 'danger' | 'icon' | 'progress';
}
