import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DrawerProps extends OverlayModel {
  children?: React.ReactNode | React.ReactNode[];
  height?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  transition?: string;
  width?: number | string;
}
