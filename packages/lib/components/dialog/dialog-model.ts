import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DialogProps extends OverlayModel {
  animationType?: 'drop' | 'pop';
  children?: React.ReactNode;
  focusable?: boolean;
  height?: number;
  onClose?: () => void;
  onOpen?: () => void;
  onSuccess?: () => void;
  title?: string;
  width?: number;
}
