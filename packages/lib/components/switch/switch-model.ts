import { CSSProperties } from 'react';

/** ✨ Component props */
export interface SwitchProps {
  /**🔷 Accessible label for the switch. Required for accessibility - use either label or aria-label */
  label?: string;

  /**🔷 ARIA label for the switch when label prop is not used */
  'aria-label'?: string;

  /**🔷 Additional description for screen readers */
  'aria-describedby'?: string;

  /**🔷 whether the switch is checked or not */
  checked?: boolean;

  /**🔷 whether the switch is disabled or not */
  disabled?: boolean;

  /**🔷 whether the switch is in focused state or not */
  focusable?: boolean;

  /**🔷 whether the switch is in loading state */
  loading?: boolean;

  /**🔷 callback executed when the state changes */
  onChange?: (val: boolean) => void;

  /**🔷 whether the switch is read-only (non-interactive but not disabled) */
  readOnly?: boolean;

  /**🔷 shows a check icon */
  showCheckIcon?: boolean;

  /**🔷 switch sizes */
  size?: 'sm' | 'md' | 'lg';

  /**🔷 custom style */
  style?: CSSProperties;

  /**🔷 width of the switch */
  width?: number;
}
