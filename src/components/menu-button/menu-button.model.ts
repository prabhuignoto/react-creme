export interface MenuButtonProps {
  label: string;
  items: string[];
  onChange?: (item?: string) => void;
  focusable?: boolean;
  selectedValue?: string;
  position?: "left" | "right";
  width?: number;
  disabled?: boolean;
}
