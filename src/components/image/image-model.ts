import { OverlayModel } from "../common/overlay-model";

export interface ImageOverlayProps extends OverlayModel {
  src: string;
  width?: number;
  height?: number;
}
