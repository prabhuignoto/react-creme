export interface MenuButtonProps {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  iconColor?: string;
  items: string[];
  onSelected?: (item?: string) => void;
  width?: number;
}
