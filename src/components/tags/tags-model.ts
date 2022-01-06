import { CSSProperties } from "react";

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
  onChange?: (selected: string[]) => void;
  maxTags?: number;
  readonly?: boolean;
  tagWidth?: number;
  tagStyle?: "default" | "fill";
  tagSize?: "small" | "large";
  disabled?: boolean;
  style?: CSSProperties;
  autoComplete?: boolean;
  suggestions?: string[];
  RTL?: boolean;
  placeholder?: string;
}
