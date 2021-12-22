export interface SliderModel {
  // minimum value
  start?: number;

  // maximum value
  end?: number;

  // callback on change
  onChange?: (value: number) => void;

  // disables the control
  disabled?: boolean;

  // disables the tooltip
  disableTooltip?: boolean;

  // tooltip position
  position?: "top" | "bottom";

  // current value of the slider
  sliderValue?: number;

  // shape of the slide handle
  knobShape?: "circle" | "square";

  // when enabled the tooltip will be shown only on hover
  showTooltipOnHover?: boolean;

  // size of the knob
  knobSize?: number;

  // width of the tooltip
  tooltipWidth?: number;

  focusable?: boolean;
}
