export interface SliderModel {
  // minimum value
  start?: number;

  // maximum value
  end?: number;

  // callback on change
  onChange?: (value: number) => void;

  // disables the control
  disabled?: boolean;

  disableTooltip?: boolean;

  position?: "top" | "bottom";

  sliderValue?: number;

  knobShape?: "circle" | "square";

  showTooltipOnHover?: boolean;

  knobSize?: number;

  tooltipWidth?: number;
}
