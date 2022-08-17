import { FunctionComponent } from 'react';
import { TagItemProps } from './tags-model';
declare type TagItemViewProps = TagItemProps & {
  handleRemove: (id: string) => void;
};
declare const TagItem: FunctionComponent<TagItemViewProps>;
export { TagItem };
