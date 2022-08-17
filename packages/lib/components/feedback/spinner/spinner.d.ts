import { FunctionComponent } from 'react';
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
}
declare const Spinner: FunctionComponent<SpinnerProps>;
export { Spinner };
