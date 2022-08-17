import React from 'react';
import { OverlayModel } from '../../common/overlay-model';
import { ListOption } from '../../list/list-model';
declare type SuggestMenuData = {
  focus: boolean;
  items: ListOption[];
};
interface SuggestionsOverlayModel extends OverlayModel<SuggestMenuData> {
  focus?: boolean;
  id?: string;
  onSelection: (option: ListOption[]) => void;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
}
declare const SuggestionsMenuOverlay: React.ForwardRefExoticComponent<
  Pick<
    SuggestionsOverlayModel,
    | 'data'
    | 'focus'
    | 'size'
    | 'children'
    | 'id'
    | 'width'
    | 'containedToParent'
    | 'hideDocumentOverflow'
    | 'onClose'
    | 'onOpen'
    | 'overlayAnimation'
    | 'placement'
    | 'placementOffset'
    | 'placementReference'
    | 'showClose'
    | 'align'
    | 'isClosing'
    | 'onClosing'
    | 'onSelection'
  > &
    React.RefAttributes<HTMLElement>
>;
export { SuggestionsMenuOverlay };
