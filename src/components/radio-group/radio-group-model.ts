export interface RadioGroupModel {
  items: RadioGroupItemModel[];
  onSelected?: (selected: string) => void;
  disabled?: boolean;
}

export interface RadioGroupItemModel {
  disabled?: boolean;
  id?: string;
  label: string;
  checked?: boolean | null;
  value?: string;
}
