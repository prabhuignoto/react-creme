export interface RadioModel {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean | null;
  label?: string;
  onChange?: (state: { id?: string; selected?: boolean }) => void;
  value?: string;
}
