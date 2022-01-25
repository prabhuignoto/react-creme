export interface ProgressProps {
  RTL?: boolean;
  currentValue?: number;
  indeterminateStyle?: 'disappear' | 'bob';
  maxValue?: number;
  showProgressValue?: boolean;
  size?: 'lg' | 'md' | 'sm';
  status?: 'success' | 'error' | 'default';
  type: 'determinate' | 'indeterminate';
  width?: number;
}
