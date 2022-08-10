export type PinProps = {
  RTL?: boolean;
  autoJump?: boolean;
  border?: boolean;
  length?: number;
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
};
