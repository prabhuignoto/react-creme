import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DrawerProps extends OverlayModel<null> {
  // ARIA accessibility props (REQUIRED for WCAG compliance)
  // Provide ariaLabel for simple text or ariaLabelledby to reference a heading ID
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;

  children?: React.ReactNode | React.ReactNode[];
  focusable?: boolean;
  height?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  transition?: string;
  width?: number | string;

  // internal exit animation state
  isExiting?: boolean;

  // loading state - shows pulse animation
  isLoading?: boolean;

  // error state - shows shake animation
  isError?: boolean;
}
