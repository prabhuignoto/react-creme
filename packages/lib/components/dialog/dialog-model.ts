import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DialogProps extends OverlayModel<null> {
  animationDuration?: number;
  animationType?: 'drop' | 'pop' | 'rise' | 'slide-left' | 'slide-right';
  children?: React.ReactNode;
  focusable?: boolean;
  height?: number;
  onClose?: () => void;
  onOpen?: () => void;
  onSuccess?: () => void;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  width?: number;
}
