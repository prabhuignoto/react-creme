import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DrawerProps extends OverlayModel<null> {
  children?: React.ReactNode | React.ReactNode[];
  focusable?: boolean;
  height?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  transition?: string;
  width?: number | string;
}
