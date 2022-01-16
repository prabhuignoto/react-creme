import { CSSProperties } from "react";

export interface TagItemModel {
  disabled?: boolean;
  name: string;
  readonly?: boolean;
}

export interface TagItemInternalModel extends TagItemModel {
  id?: string;
  markedForRemoval?: boolean;
}
export interface TagsModel {
  RTL?: boolean;
  autoComplete?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: TagItemModel[];
  maxTags?: number;
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  readonly?: boolean;
  style?: CSSProperties;
  suggestions?: string[];
  tagSize?: "small" | "large";
  tagStyle?: "default" | "fill";
  tagWidth?: number;
}
