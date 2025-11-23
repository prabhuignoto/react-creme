export interface MenuButtonProps {
  RTL?: boolean;
  disabled?: boolean;
  iconColor?: string;
  items: string[];
  onSelected?: (item?: string) => void;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
}
