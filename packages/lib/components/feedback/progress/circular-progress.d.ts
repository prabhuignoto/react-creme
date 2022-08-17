import React from 'react';
export interface CircularProgressProps {
  _innerCircleColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: 'double-ring' | 'default';
  type?: 'infinite' | 'progressive';
}
declare const CircularProgress: React.FunctionComponent<CircularProgressProps>;
export { CircularProgress };
