/**
 * PIN code input component props
 * Supports both controlled and uncontrolled modes
 */
export interface PinProps {
  // Sizing & Layout
  /** Number of PIN digits. Default: 4 */
  length?: number;

  /** Size variant. Default: 'sm' */
  size?: 'sm' | 'md' | 'lg';

  /** Right-to-left layout. Default: false */
  RTL?: boolean;

  /** Show border around each input. Default: false */
  border?: boolean;

  // Controlled/Uncontrolled
  /** Controlled value (makes component controlled) */
  value?: string;

  /** Initial value for uncontrolled mode */
  defaultValue?: string;

  // Behavior
  /** Auto-jump to next input on digit entry. Default: true */
  autoJump?: boolean;

  /** Disable all inputs. Default: false */
  disabled?: boolean;

  /** Read-only mode. Default: false */
  readOnly?: boolean;

  /** Show loading state. Default: false */
  loading?: boolean;

  // Security
  /** Mask digits (show as bullets/asterisks). Default: false */
  mask?: boolean;

  /** Character to use for masking. Default: '●' */
  maskChar?: string;

  /** Delay before masking each digit in ms. Default: 0 (immediate) */
  maskDelay?: number;

  // Validation & Feedback
  /** Error message to display */
  error?: string;

  /** Status for visual feedback. Default: 'default' */
  status?: 'default' | 'success' | 'error' | 'warning';

  /** Helper text for instructions */
  helperText?: string;

  /** Auto-focus first input. Default: false */
  autoFocus?: boolean;

  // Accessibility
  /** Accessible label for the input group (overrides default) */
  label?: string;

  /** aria-label attribute (if not using label prop) */
  'aria-label'?: string;

  /** aria-describedby for additional context/instructions */
  'aria-describedby'?: string;

  // Callbacks
  /** Called when value changes (returns string to preserve leading zeros) */
  onChange?: (value: string) => void;

  /** Called when all digits are entered */
  onComplete?: (value: string) => void;

  /** Called on validation/status change */
  onStatusChange?: (status: 'default' | 'success' | 'error' | 'warning') => void;
}

/**
 * Imperative handle methods for Pin component
 */
export interface PinHandle {
  /** Reset PIN to empty */
  reset: () => void;

  /** Focus first input */
  focus: () => void;

  /** Get current PIN value as string */
  getValue: () => string;

  /** Check if all digits are filled */
  isComplete: () => boolean;
}
