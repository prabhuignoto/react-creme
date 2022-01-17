export interface ProgressProps {
  RTL?: boolean;
  currentValue?: number;
  infiniteStyle?: 'disappear' | 'bob';
  maxValue?: number;
  showProgressValue?: boolean;
  size?: 'lg' | 'md' | 'sm';
  status?: 'success' | 'error' | 'default';
  type: 'infinite' | 'progressive';
  width?: number;
}
