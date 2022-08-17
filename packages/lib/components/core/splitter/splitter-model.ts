import React from 'react';

export interface SplitterProps {
  border?: boolean;
  children: React.ReactNode[];
  dir: 'horizontal' | 'vertical';
  handleBarWidth?: number;
  maxSplitHeight?: number;
  maxSplitWidth?: number;
  minSplitHeight?: number;
  minSplitWidth?: number;
}
