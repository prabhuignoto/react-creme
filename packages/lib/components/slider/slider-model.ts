export interface SliderProps {
  // disables the tooltip
  disableTooltip?: boolean;

  // disables the control
  disabled?: boolean;

  // maximum value
  end?: number;

  focusable?: boolean;

  formatter?: (value: number) => string;

  // shape of the slide handle
  knobShape?: "circle" | "square";

  // size of the knob
  knobSize?: number;

  // callback on change
  onChange?: (value: number) => void;

  // tooltip position
  position?: "top" | "bottom";

  // when enabled the tooltip will be shown only on hover
  showTooltipOnHover?: boolean;

  // current value of the slider
  sliderValue?: number;

  // minimum value
  start?: number;

  // width of the tooltip
  tooltipWidth?: number;
}
