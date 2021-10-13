export interface TagItemModel {
  name: string;
  disabled?: boolean;
  id?: string;
}

export interface TagsModel {
  items: TagItemModel[];
  onSelected?: (selected: string[]) => void;
}
