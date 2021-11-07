export interface TagItemModel {
  name: string;
  disabled?: boolean;
  readonly?: boolean;
}

export interface TagItemInternalModel extends TagItemModel {
  id?: string;
  markedForRemoval?: boolean;
}
export interface TagsModel {
  items: TagItemModel[];
  onSelected?: (selected: string[]) => void;
  maxTags?: number;
  restrictToValues?: string[];
  readonly?: boolean;
  tagWidth?: number;
  tagStyle?: "default" | "fill";
  tagSize?: "small" | "large";
  disabled?: boolean;
}
