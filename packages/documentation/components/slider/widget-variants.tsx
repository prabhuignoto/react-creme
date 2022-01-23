import React from 'react';
import { Slider } from '../../../lib/components';

export const Default = (
  <Slider
    start={4}
    end={13}
    // onChange={(val) => console.log(val)}
    position="top"
    knobShape="square"
    knobSize={15}
  />
);

export const PreSelected = (
  <Slider
    start={1}
    end={20}
    position="top"
    knobShape="square"
    knobSize={15}
    sliderValue={10}
  />
);

export const TooltipOnHover = (
  <Slider
    start={1}
    end={20}
    position="top"
    knobShape="square"
    knobSize={15}
    sliderValue={10}
    showTooltipOnHover
  />
);

export const TooltipFormatted = (
  <Slider
    start={1}
    end={20}
    sliderValue={15}
    knobSize={16}
    formatter={val => `value: ${val}`}
    tooltipWidth={70}
  />
);

export const CustomTooltipPosition = (
  <Slider start={15} end={70} knobSize={16} position="bottom" />
);

export const Disabled = (
  <Slider
    start={5}
    end={67}
    disabled
    knobSize={16}
    sliderValue={60}
    position="bottom"
  />
);
