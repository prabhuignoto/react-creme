export interface CheckboxModel {
  label: string;
  onChange?: (selected: boolean) => void;
  isChecked?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}
