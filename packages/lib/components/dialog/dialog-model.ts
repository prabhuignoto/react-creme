import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DialogProps extends OverlayModel {
  children?: React.ReactNode;
  focusable?: boolean;
  height?: number;
  onClose?: () => void;
  onSuccess?: () => void;
  title?: string;
  width?: number;
}
