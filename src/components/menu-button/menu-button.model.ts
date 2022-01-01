export interface MenuButtonProps {
  items: string[];
  onSelected?: (item?: string) => void;
  focusable?: boolean;
  width?: number;
  disabled?: boolean;
  RTL?: boolean;
}
