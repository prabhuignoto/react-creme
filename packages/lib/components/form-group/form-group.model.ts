import { FormHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the FormGroup component
 */
export type FormGroupProps = FormHTMLAttributes<HTMLFormElement> & {
  /** Enable right-to-left text direction */
  RTL?: boolean;

  /**
   * Custom label for the cancel button.
   * Useful for internationalization.
   * @default 'Cancel'
   */
  cancelLabel?: string;

  /** Form field children (inputs, selects, etc.) */
  children: ReactNode | ReactNode[];

  /**
   * Callback fired when cancel button is clicked.
   * Form is NOT submitted when this is called.
   */
  onCancel?: () => void;

  /**
   * Callback fired when form is submitted.
   * Note: This is called in addition to native form submission.
   */
  onSubmit?: () => void;

  /**
   * Custom label for the submit button.
   * Useful for internationalization (e.g., 'Save', 'Send', 'Continue').
   * @default 'Submit'
   */
  submitLabel?: string;
};

/**
 * Internal props for form items (internal use only)
 */
export type FormItemProps = {
  child?: ReactNode;
  id?: string;
};
