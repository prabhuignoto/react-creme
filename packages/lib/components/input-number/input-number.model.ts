export type InputNumberProps = {
  RTL?: boolean;
  alignCenter?: boolean;
  border?: boolean;
  disableControls?: boolean;
  disabled?: boolean;
  end?: number;
  focusable?: boolean;
  honorBoundaries?: boolean;
  maxLength?: number;
  onChange?: (value: number) => void;
  onDelete?: () => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  start?: number;
  value?: number;
};
