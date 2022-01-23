import { CSSProperties } from 'react';

/** ✨ Component props */
export interface SwitchProps {
  /**🔷 whether the switch is checked or not */
  checked?: boolean;

  /**🔷 whether the switch is disabled or not */
  disabled?: boolean;

  /**🔷 whether the switch is in focused state or not */
  focusable?: boolean;

  /**🔷 label for the switch */
  label?: string;

  /**🔷 if the label is separate from the switch */
  labelOutside?: boolean;

  /**🔷 callback executed when the state changes */
  onChange?: (val: boolean) => void;

  /**🔷 shows a check icon */
  showCheckIcon?: boolean;

  /**🔷 switch sizes */
  size?: 'sm' | 'md' | 'lg';

  /**🔷 custom style */
  style?: CSSProperties;

  /**🔷 width of the switch */
  width?: number;
}
