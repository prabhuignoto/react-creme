export interface MenuButtonProps {
  placeholder: string;
  items: string[];
  onSelected?: (item?: string) => void;
  focusable?: boolean;
  selectedValue?: string;
  position?: "left" | "right";
  width?: number;
  disabled?: boolean;
}
