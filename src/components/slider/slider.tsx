import React, { useEffect, useRef } from "react";
import { useDrag } from "../common/effects/useDrag";
import "./slider.scss";

export interface SliderModel {
  start?: number;
  end?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FunctionComponent<SliderModel> = ({
  start = 1,
  end = 100,
  onChange,
}) => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [percent] = useDrag(trackerRef, controlRef, {
    direction: "horizontal",
  });

  const sliderTrack = useRef<{ left?: number; width?: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (trackerRef.current) {
      const { clientWidth: width } = trackerRef.current;
      sliderTrack.current = {
        left: trackerRef.current.getBoundingClientRect().left,
        width,
      };
    }
  }, [trackerRef]);

  useEffect(() => {
    onChange && onChange(Math.round(end * percent));
  }, [percent]);

  return (
    <div className="slider-wrapper">
      <div className="slider-track" ref={trackerRef}>
        <div className="slider-track-progress" ref={progressRef}></div>
        <span className="slider-control" ref={controlRef}></span>
      </div>
    </div>
  );
};

export { Slider };
